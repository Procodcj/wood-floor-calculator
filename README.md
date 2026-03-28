# Wood Floor Suite

A free, open source collection of professional tools built for the wood flooring industry.

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
- New Calculation and Clear History buttons

---

### 📐 Room Estimator
Measure rooms and calculate the total square footage of a flooring project.

- Add as many rooms as needed (Kitchen, Master Bedroom, Hallway, etc.)
- Each room supports multiple sections for irregular shaped spaces
- Grand total updates automatically as rooms and sections are added
- All measurements in feet

---

### 🪣 Stain Calculator
Calculate exact mix quantities for oil and water based wood stains using a parts-based formula.

**Oil Based Stain**
- 1 quart covers approximately 165 sq ft
- Supports any brand
- Color names can be text or numbers (e.g. Natural or 200)
- Purchase guide shows how many quarts to buy per color

**Water Based Stain**
- 1 gallon covers approximately 700 sq ft
- Purchase guide shows how many gallons to buy per color

---

## Files

```
├── index.html              # Main menu
├── pallet-calculator.html  # Pallet Calculator
├── room-estimator.html     # Room Estimator
├── stain-calculator.html   # Stain Calculator
├── style.css               # Shared styles
├── home.css                # Home screen styles
├── room-estimator.css      # Room Estimator styles
├── stain-calculator.css    # Stain Calculator styles
├── app.js                  # Pallet Calculator logic
├── room-estimator.js       # Room Estimator logic
└── stain-calculator.js     # Stain Calculator logic
```

## Security

All user inputs are sanitized against XSS. No server, no database, no data collection — everything runs in the browser.

## License

MIT License — free to use, modify, and distribute with attribution.