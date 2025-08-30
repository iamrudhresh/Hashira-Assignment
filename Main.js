const fs = require("fs");

// ---------- Big Rational implementation ----------
class Rational {
  constructor(num, den = 1n) {
    if (den === 0n) throw new Error("Zero denominator");
    if (den < 0n) { num = -num; den = -den; }
    const g = gcd(num, den);
    this.num = num / g;
    this.den = den / g;
  }
  add(r) { return new Rational(this.num * r.den + r.num * this.den, this.den * r.den); }
  sub(r) { return new Rational(this.num * r.den - r.num * this.den, this.den * r.den); }
  mul(r) { return new Rational(this.num * r.num, this.den * r.den); }
  div(r) { return new Rational(this.num * r.den, this.den * r.num); }
  equals(r) { return this.num === r.num && this.den === r.den; }
  toString() {
    if (this.den === 1n) return this.num.toString();
    return this.num.toString() + "/" + this.den.toString();
  }
}
function gcd(a, b) { return b === 0n ? (a < 0n ? -a : a) : gcd(b, a % b); }

// ---------- Parse JSON input ----------
function parseInput(jsonStr) {
  const obj = JSON.parse(jsonStr);
  const n = obj.keys.n;
  const k = obj.keys.k;
  const points = [];

  for (const key in obj) {
    if (key === "keys") continue;
    const x = BigInt(key);
    const base = parseInt(obj[key].base);
    const valStr = obj[key].value.toLowerCase();
    const y = BigInt(parseIntBase(valStr, base));
    points.push({ x, y });
  }
  return { n, k, points };
}

// Convert arbitrary base string -> BigInt
function parseIntBase(str, base) {
  let result = 0n;
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (const ch of str) {
    const v = BigInt(chars.indexOf(ch));
    if (v < 0n || v >= BigInt(base)) throw new Error("Invalid digit: " + ch);
    result = result * BigInt(base) + v;
  }
  return result;
}

// ---------- Lagrange interpolation ----------
function lagrangeAt0(subset) {
  let res = new Rational(0n, 1n);
  const k = subset.length;
  for (let i = 0; i < k; i++) {
    let term = new Rational(subset[i].y, 1n);
    const xi = new Rational(subset[i].x, 1n);
    for (let j = 0; j < k; j++) {
      if (i === j) continue;
      const xj = new Rational(subset[j].x, 1n);
      term = term.mul(xj.div(xj.sub(xi)));
    }
    res = res.add(term);
  }
  return res;
}

// Evaluate polynomial at x using Lagrange (for checking wrong points)
function lagrangeEval(subset, X) {
  let res = new Rational(0n, 1n);
  const k = subset.length;
  const x = new Rational(X, 1n);
  for (let i = 0; i < k; i++) {
    let term = new Rational(subset[i].y, 1n);
    const xi = new Rational(subset[i].x, 1n);
    for (let j = 0; j < k; j++) {
      if (i === j) continue;
      const xj = new Rational(subset[j].x, 1n);
      term = term.mul(x.sub(xj).div(xi.sub(xj)));
    }
    res = res.add(term);
  }
  return res;
}

// ---------- Main solver ----------
function solve(jsonStr) {
  const { n, k, points } = parseInput(jsonStr);

  // Try all subsets of size k
  const combs = combinations(points, k);

  let bestSecret = null;
  let bestAgree = -1;
  let wrongPoints = [];

  for (const subset of combs) {
    const secret = lagrangeAt0(subset);

    // check agreement with all n points
    let agree = 0;
    let wrong = [];
    for (const p of points) {
      const val = lagrangeEval(subset, p.x);
      if (val.den === 1n && val.num === p.y) {
        agree++;
      } else {
        wrong.push(Number(p.x));
      }
    }
    if (agree > bestAgree) {
      bestAgree = agree;
      bestSecret = secret;
      wrongPoints = wrong;
    }
  }

  return { secret: bestSecret.toString(), wrongPoints };
}

// Generate combinations
function combinations(arr, k) {
  const result = [];
  function helper(start, comb) {
    if (comb.length === k) {
      result.push([...comb]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      comb.push(arr[i]);
      helper(i + 1, comb);
      comb.pop();
    }
  }
  helper(0, []);
  return result;
}

// ---------- Run ----------
if (require.main === module) {
const filename = process.argv[2];
const input = fs.readFileSync(filename, "utf8");
  const { secret, wrongPoints } = solve(input);
  console.log("Secret (f(0)) =", secret);
  console.log("Wrong Data Points:", wrongPoints.length ? wrongPoints.join(", ") : "None");
}
