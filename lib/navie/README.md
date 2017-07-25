## Philosophy

- **Completely self-contained** : the library will load itselfs any other scripts, css files and images that it may require.
- **Developer friendly**. Designed with the idea that you *will* completely forget about the API in a few days, so it should be extremely easy to get just by reading one example. Also, the library logs warnings when it suspects something is wrong.
- **100% HTML based.** We promise that you will never have to touch any other file that your `.html`to make it work. No more `init` function, classes memorization, `theme.css`...


## Usage 

Navie.js allows to build any kind of responsive navigation bar in a few seconds. 

1. Include the `navie` library in your `/lib` folder
2. Include the `<script src="lib/navie.js"></script>` at the end of your page
3. Add the `nav` attribute on any element and declarate what you want

## Example

```javascript 
<div nav layout="center" hover="underline" anim="sliding" opts="shrink">
    <div active label="Home" id="hello" target="/hello.html"></div>
    <div id="team" label="Team" target="/team.html"></div>
    <div id="logo" src="logo.png" label="Nightmatch" target="/index.html"></div>
    <div id="products" label="Products" target="/fleurs.html"></div>
    <div id="services" label="Services" target="sub">
        <div id="air" label="Air" target=".espace"></div>
        <div id="water" label="Water" target=".sun"></div>
    </div>
</div>
```

## API
Including the scripts adds a `Navie` object to the global `window`. All methods are public by default, for testing purposes. 


## Todo

- Improve the `README`
- Make a website with lots of examples
- Break free of the jQuery/Velocity dependency
- Test in older browsers :) 