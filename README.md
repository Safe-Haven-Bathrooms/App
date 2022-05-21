# LOO - A local guide to accessible bathrooms

## Description

This is an app that finds gender neutral and accessible public restrooms near you. Loo was created using Javascript, Tailwind, jQuery, Google Maps API, and Refuge Restrooms API. Here is a [link to the deployed page](https://safe-haven-bathrooms.github.io/App/).

Some things that we learned while developing Loo:
- This was our first time using the Tailwind framework, and we learned how to access Tailwind without using Node.js
- We created a dynamic Google Maps rendering, and learned about geolocation, referencing other API data, and creating custom map icons
- We were able to utilize a local storage array to save entire blocks of rendered data and append them to a favorites page upon reload

## User Story

```
AS A bathroom seeker
I WANT to find a accessible and non-conforming bathroom
SO THAT I can use bathrooms at ease
```
### Technologies Used
- HTML
- [Tailwind CSS Framework](https://tailwindcss.com/)
- Javascript
- [Refuge API](https://www.refugerestrooms.org/api/docs/)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview)


## Acceptance Criteria

```
GIVEN THAT I’m opening the app
THEN I am shown my favorites list -  favorites tab 
WHEN I view the homescreen
THEN I am prompted to search for a facility nearby
WHEN I search for a bathroom
THEN I am shown nearby bathrooms on a map
WHEN I click on a bathroom
THEN a data screen with the address and icons are shown for accessibility, gender-neutral, clean, public, and family traits
WHEN I select a bathroom
THEN I can navigate there - tentative  
WHEN I click the heart icon - 
THEN I can save the bathroom to my favorites list
WHEN I click write review
THEN I can write a review to Google Maps

```

## Usage

Here is an example of the final page.
<!-- TODO Update screenshot -->
![screenshot of finished page](./assets/images/screenshot.png)

## Credits

This app is brought to you by: Givens, Alex, Kaluki, & Elia
