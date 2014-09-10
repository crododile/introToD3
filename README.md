introToD3
=========

node app for intro to d3 talk

Follow the radio buttons in sequence to learn a fundamental d3 pattern for getting data to the browser.
Evaluate the code samples in the chrome dev tools to see problems and the ensueing solutions and iteratively build up a bar graph.

<a href="http://d3intro.herokuapp.com/">Check it out</a>

Of other interest is an api solution that allows a new slide to be easily added to the site,<br>
by creating the view document and adding a path with the same name to the array of path objects in <br>
<a href="https://github.com/crododile/introToD3/blob/master/routes/index.js">the index router</a>.<br>

D3 is used to generate the navigation links based on that array, and wildcard routing matches views to paths.
