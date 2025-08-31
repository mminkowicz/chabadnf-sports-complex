# How to Update Campaign Totals

## Option 1: Edit the JSON File (Recommended)

1. Open the file `public/campaign-data.json` in any text editor
2. Update the numbers:
   - `goal`: The total amount needed (in dollars, no commas)
   - `raised`: The amount raised so far (in dollars, no commas)
   - `lastUpdated`: Today's date in YYYY-MM-DD format
3. Save the file
4. The website will automatically show the new totals

### Example:
```json
{
  "goal": 1800000,
  "raised": 450000,
  "lastUpdated": "2024-01-20"
}
```

## Option 2: Edit the Donate Page Directly

1. Open `src/pages/Donate.js`
2. Find the FundraisingWidget component (around line 50)
3. Update the `goal` and `raised` values:
```javascript
<FundraisingWidget
  goal={1800000}      // Change this number
  raised={450000}     // Change this number
  onDonateClick={handleDonateClick}
/>
```

## Option 3: Use a Simple Admin Panel (Future Enhancement)

We can create a simple password-protected page where you can update totals through a form interface.

---

**Note:** After making changes, you may need to refresh the website to see updates.
