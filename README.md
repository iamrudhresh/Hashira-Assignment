
# Hashira Placements Assignment – Online

## Problem Statement

We are given test cases in **JSON format** containing multiple points (`x, y`), where the `y` values are encoded in **different bases**.
The task is to:

1. Parse the input JSON.
2. Convert all values to decimal (`BigInt`).
3. Use **polynomial interpolation (Lagrange method)** with `k` points to reconstruct the polynomial.
4. Find the **secret value** → `f(0)` (the constant term).
5. Detect and report wrong data points → points that do not fit the reconstructed polynomial.

---

## Technology Used

* **Language**: JavaScript (Node.js)
* **Key Features**:

  * `BigInt` for arbitrarily large numbers.
  * Custom `Rational` class for exact fraction arithmetic, avoiding floating-point errors.
  * Lagrange interpolation to reconstruct the hidden polynomial from valid points.

### Why JavaScript (Node.js)?

* **Native BigInt support**: Handles large integer calculations without external libraries.
* **Direct JSON handling**: JSON parsing is built into JavaScript, making the input processing simpler and more reliable.
* **Cross-platform**: Node.js runs consistently across systems, ensuring easy testing and execution.
* **Rapid prototyping**: Suitable for assignments where correctness and speed of development are equally important.

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

In PowerShell, CMD, or any terminal, navigate to the project folder and run:

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

All given points lie on the reconstructed polynomial.

---

### Test Case 2 (`testcase2.json`)

```
Secret (f(0)) = 79836264049851
Wrong Data Points: 2, 8
```

Points at **x=2** and **x=8** do not match the polynomial reconstructed from the valid `k=7` points.

---

## Approach

1. Parse JSON and extract `(x, base, value)` triplets.

2. Convert each `value` into decimal using its `base`.

3. Select `k` points and apply **Lagrange interpolation**.

   Formula:

   $$
   f(0) = \sum_{i=1}^k y_i \cdot \prod_{j \neq i} \frac{0 - x_j}{x_i - x_j}
   $$

4. Evaluate `f(0)` to obtain the secret.

5. Verify all points by substituting `x` into the polynomial:

   * If `f(x)` matches the given `y` → valid point.
   * If not → wrong data point.

---

## Why Wrong Data Points Exist

In secret sharing schemes such as **Shamir’s Secret Sharing**:

* The polynomial can be reconstructed from any `k` valid points.
* If more than `k` points are given, extra points may be **tampered, corrupted, or invalid**.
* These incorrect points will not satisfy the reconstructed polynomial.

In **Test Case 2**:

* The polynomial built from 7 valid points predicts values that do not match the data for `x=2` and `x=8`.
* Therefore, these are reported as wrong points.

This ensures that the reconstructed secret is **robust and trustworthy**, even if some data is incorrect.

---

## Final Results

* **Test Case 1** → Secret: `3` • Wrong Points: None
* **Test Case 2** → Secret: `79836264049851` • Wrong Points: `2, 8`

The algorithm correctly reconstructs the secret and identifies invalid data points.

---
