# Square in Circle

Recreation of this [post](https://www.reddit.com/r/oddlysatisfying/comments/612k6m/i_made_a_square_inside_of_a_circle/) on Reddit using HTML canvas.

## Installation

_To run this applet on your machine, follow one of the two steps listed below._

* Clone the repository via command line `git clone https://github.com/0x213F/square_in_circle`.

* Click `Clone or download` then `Download ZIP`.

## Usage

1. Open the `index.html` file. It will open in your default web browser.

2. Play with the sliders and buttons in the top left to change the behavior of the animation.

## Contributing

As of now there are three minor inconveniences as listed below. If you have a feature request, please create a `New issue` with an `enhancement` label.

* Line 20 in `script.js` has a TODO. The outter dots only need to be drawn every time the screen is resized. This should significantly increase performance (not that performance is really an issue).

* Line 12 and 18 in `ui.js` have a TODO. Preferably the animation would not jump when updating the radius and time interval values. This probably relates to `var startTime` in `script.js` on line 7.

* Utilize `sessionStorage` or `localStorage` to cache the variables.

## Credits

* [jaredwilli](http://stackoverflow.com/users/20446/aherrick) with the canvas template.
* [Mr-VS](https://github.com/mr-vs) as a collaborator.
* [/u/XxSuprTuts99xX](https://www.reddit.com/user/XxSuprTuts99xX) for the inspiration.
