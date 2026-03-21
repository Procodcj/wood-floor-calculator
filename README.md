# Wood Floor Suite

A collection of flooring tools built for professionals in the wood flooring industry.

## Live Demo

🔗 [procodcj.github.io/wood-floor-suite](https://procodcj.github.io/wood-floor-suite)

## Tools

### 📦 Pallet Calculator
Calculate the square footage of wood flooring from pallet and bundle data.

| Field | Description |
|---|---|
| Bundle Length | Length of the boards in a bundle (ft or in) |
| Board Width | Width of each board (ft or in) |
| Boards per Bundle | How many boards are in one bundle |
| Bundles per Pallet | How many bundles make up the pallet |

**Output:** Total sq ft per pallet, per bundle, and per board.

- Accepts whole numbers, decimals, and fractions (e.g. `12 3/4`, `5 1/2`)
- Supports inches and feet for both length and width
- Calculation history with grand total across multiple pallets

---

### 📐 Room Estimator
Measure rooms and calculate the total square footage of a project.

- Add as many rooms as needed (Kitchen, Master Bedroom, etc.)
- Each room supports multiple sections for irregular shaped spaces
- Grand total updates automatically as rooms and sections are added

---

## Files

```
├── index.html              # Main menu
├── pallet-calculator.html  # Pallet Calculator
├── room-estimator.html     # Room Estimator
├── style.css               # Shared styles
├── home.css                # Home screen styles
├── room-estimator.css      # Room Estimator styles
├── app.js                  # Pallet Calculator logic
└── room-estimator.js       # Room Estimator logic
```

## Deployment

Hosted via [GitHub Pages](https://pages.github.com/).