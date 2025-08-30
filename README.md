
# Hashira Placements Assignment – Online

## Problem Statement

We are given test cases in **JSON format** that contain multiple points (`x, y`) encoded in different bases.
The task is to:

1. Parse the input.
2. Convert all values to decimal (`BigInt`).
3. Use **polynomial interpolation (Lagrange method)** with `k` points to reconstruct the polynomial.
4. Find the **secret value** → `f(0)` (constant term).
5. Detect and report **wrong data points** (points that do not lie on the polynomial).

---

## Technology Used

* **Language**: JavaScript (Node.js)
* **Key Features Utilized**:

  * `BigInt` for handling very large numbers.
  * A custom `Rational` class for exact fraction arithmetic (avoids floating-point errors).
  * Lagrange interpolation for polynomial reconstruction.

### Why JavaScript (Node.js)?

* **Cross-platform and fast setup**: Node.js runs easily in different environments without heavy dependencies.
* **Native BigInt support**: JavaScript provides built-in support for arbitrary-precision integers, which is critical for handling very large values in this problem.
* **Ease of working with JSON**: Since test cases are given in JSON, JavaScript (being natively tied to JSON) provides direct parsing with no extra libraries.
* **Rapid prototyping**: JavaScript allows quick implementation and testing, making it efficient for assignments and problem-solving scenarios.

---

## Project Structure

```
Hashira-Assignment/
│
├── main.js          # Solution code
├── testcase1.json   # Sample test case (n=4, k=3)
├── testcase2.json   # Second test case (n=10, k=7)
└── README.md        # Documentation
```

---

## How to Run

### Step 1: Install Node.js

Download from [https://nodejs.org](https://nodejs.org) and verify installation:

```bash
node -v
```

### Step 2: Run with JSON test file

Navigate to the project folder and run:

```bash
node main.js testcase1.json
node main.js testcase2.json
```

---

## Expected Outputs

### Test Case 1 (`testcase1.json`)

```
Secret (f(0)) = 3
Wrong Data Points: None
```

### Test Case 2 (`testcase2.json`)

```
Secret (f(0)) = 79836264049851
Wrong Data Points: 2, 8
```

---

## Approach

1. Parse the JSON and extract `(x, base, value)`.
2. Convert each value to decimal using its given base.
3. Select `k` points and compute the polynomial using **Lagrange interpolation**.
4. Evaluate the polynomial at `x=0` to determine the secret.
5. Verify all provided points against the reconstructed polynomial.

   * If `f(x)` = given `y` → valid point.
   * If `f(x)` ≠ given `y` → wrong data point.

---

## Why Wrong Data Points Exist

In **secret sharing schemes** (like Shamir’s Secret Sharing):

* The secret polynomial can be reconstructed using any `k` valid points.
* If extra points (`n > k`) are provided, some may be **corrupted, tampered, or simply invalid**.
* These invalid points will not satisfy the reconstructed polynomial.

In **Test Case 2**, points at `x=2` and `x=8` do not match the polynomial formed from the valid 7 points, so they are marked as wrong.

---

## Final Results

* **Test Case 1** → Secret: `3` • Wrong Points: None
* **Test Case 2** → Secret: `79836264049851` • Wrong Points: `2, 8`

---

