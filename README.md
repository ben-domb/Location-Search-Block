# Location-Search-Block

This is a git repo for the code I'm using for the 'Location search' custom block.

### Objective of the block:

- Search for a parent's address (or type it in, and then press a button)
- The block will add a marker to the map at that address
- The map will already show markers for all the providers on the map
- Different coloured markers will show depending on some conditions
- When youo click on a marker, a pop-up window will show up with the name of that record, the address, and a link to expand that record

### What the block currently does:

- It has a text input and a button, so when you press the button it `console.log()`s the text
- It has a seperate text input that when you type in an address it will display a pop up with suggestions.
- When you select a suggestion, it fills in the search bar with that suggestion, and `console.log()`s the latitude and longitude of that address
- If you click anywhere on the map, it'll add a marker at that point

### Useful Links:

- Airtable API Reference: https://airtable.com/developers/blocks/api
- Youtube Video I used to put the map in: https://www.youtube.com/watch?v=WZcxJGmLbSo
  (Note: I have used this youtube video as reference for a lot of the stuff I've been doing)
