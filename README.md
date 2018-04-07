# customer-food-and-drinks

I have documented any decisions i thought worth mentioning in the relevant commit. The commit history is quite verbose, i would probably squash a few of these commits before merging if this was a PR. I have left it as it is here as it gives a good idea of my workflow.

I have used the location and range provided as defaults but given the option to change them. This was trivial to do but makes the tool much more reuasble.

Next steps would be to add some styling and maybe a map! But i think this has everything that was communicated in the requirements.

This was fun to make, i hope you like it.

One thing to note, make sure you run it with `ember s -e production`. If you spin it up with just `ember s` you'll only see the mock data.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd customer-food-and-drinks`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
