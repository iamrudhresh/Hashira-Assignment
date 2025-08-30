# Hashira Placements Assignment – Online

## 📌 Problem Statement

We are given test cases in **JSON format** that contain multiple points (`x, y`) encoded in different bases.
The task is to:

1. Parse the input.
2. Convert all values to decimal (`BigInt`).
3. Use **polynomial interpolation (Lagrange method)** with `k` points to reconstruct the polynomial.
4. Find the **secret value** → `f(0)` (constant term).
5. Detect and report **wrong data points** (points that do not lie on the polynomial).

---

## ⚙️ Tech Used

* **Language**: JavaScript (Node.js)
* **Features Used**:

  * `BigInt` for large numbers.
  * Custom `Rational` class for exact fraction arithmetic (to avoid floating-point errors).
  * Lagrange interpolation to reconstruct the polynomial.

---

## 📂 Project Structure

```
Hashira-Assignment/
│
├── main.js          # Solution code
├── testcase1.json   # Sample test case (n=4, k=3)
├── testcase2.json   # Second test case (n=10, k=7)
└── README.md        # Documentation
```

---

## ▶️ How to Run

### 1. Install Node.js

Download from [https://nodejs.org](https://nodejs.org) and verify:

```bash
node -v
```

### 2. Run with JSON file as argument

In **PowerShell or CMD**, navigate to the project folder and run:

```powershell
node main.js testcase1.json
node main.js testcase2.json
```

---

## 🧪 Expected Outputs

### ✅ Test Case 1 (testcase1.json)

```text
Secret (f(0)) = 3
Wrong Data Points: None
```

### ✅ Test Case 2 (testcase2.json)

```text
Secret (f(0)) = 79836264049851
Wrong Data Points: 2, 8
```

---

## 📝 Approach

1. Parse the JSON and extract `(x, base, value)`.
2. Convert each value to decimal using its base.
3. For all `k`-sized subsets, compute the polynomial using **Lagrange interpolation**.
4. Evaluate the polynomial at `x=0` → gives the **secret**.
5. Compare polynomial with all given points → mismatches are reported as **wrong data points**.

---

##  Final Results

* **Output for Test Case 1:** `3`
* **Output for Test Case 2:** `79836264049851`
* **Wrong Data Set (Test Case 1):** `None`
* **Wrong Data Set (Test Case 2):** `2, 8`


---

