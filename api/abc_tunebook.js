//    abc_tunebook.js: splits a string representing ABC Music Notation into individual tunes.
//    Copyright (C) 2010 Paul Rosen (paul at paulrosen dot net)
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

/*global document, Raphael */
/*global window, ABCJS, console */

if (!window.ABCJS)
	window.ABCJS = {};

(function() {
	ABCJS.numberOfTunes = function(abc) {
		var tunes = abc.split("\nX:");
		var num = tunes.length;
		if (num === 0) num = 1;
		return num;
	};

	ABCJS.TuneBook = function(book) {
		var This = this;
		var directives = "";
		book = window.ABCJS.parse.strip(book);
		var tunes = book.split("\nX:");
		for (var i = 1; i < tunes.length; i++)	// Put back the X: that we lost when splitting the tunes.
			tunes[i] = "X:" + tunes[i];
		// Keep track of the character position each tune starts with.
		var pos = 0;
		This.tunes = [];
		window.ABCJS.parse.each(tunes, function(tune) {
			This.tunes.push({ abc: tune, startPos: pos});
			pos += tune.length;
		});
		if (This.tunes.length > 1 && !window.ABCJS.parse.startsWith(This.tunes[0].abc, 'X:')) {	// If there is only one tune, the X: might be missing, otherwise assume the top of the file is "intertune"
			// There could be file-wide directives in this, if so, we need to insert it into each tune. We can probably get away with
			// just looking for file-wide directives here (before the first tune) and inserting them at the bottom of each tune, since
			// the tune is parsed all at once. The directives will be seen before the engraver begins processing.
			var dir = This.tunes.shift();
			var arrDir = dir.abc.split('\n');
			window.ABCJS.parse.each(arrDir, function(line) {
				if (window.ABCJS.parse.startsWith(line, '%%'))
					directives += line + '\n';
			});
		}
		This.header = directives;

		// Now, the tune ends at a blank line, so truncate it if needed. There may be "intertune" stuff.
		window.ABCJS.parse.each(This.tunes, function(tune) {
			var end = tune.abc.indexOf('\n\n');
			if (end > 0)
				tune.abc = tune.abc.substring(0, end);
			tune.pure = tune.abc;
			tune.abc = directives + tune.abc;

			// for the user's convenience, parse and store the title separately. The title is between the first T: and the next \n
			var title = tune.pure.split("T:");
			if (title.length > 1) {
				title = title[1].split("\n");
				tune.title = title[0].replace(/^\s+|\s+$/g, '');
			} else
				tune.title = "";

			// for the user's convenience, parse and store the id separately. The id is between the first X: and the next \n
			var id = tune.pure.substring(2, tune.pure.indexOf("\n"));
			tune.id = id.replace(/^\s+|\s+$/g, '');
		});
	};

	ABCJS.TuneBook.prototype.getTuneById = function(id) {
		for (var i = 0; i < this.tunes.length; i++) {
			if (this.tunes[i].id === id)
				return this.tunes[i];
		}
		return null;
	};

	ABCJS.TuneBook.prototype.getTuneByTitle = function(title) {
		for (var i = 0; i < this.tunes.length; i++) {
			if (this.tunes[i].title === title)
				return this.tunes[i];
		}
		return null;
	};

	function renderEngine(callback, output, abc, parserParams, renderParams) {
		var ret = [];
		var isArray = function(testObject) {
			return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
		};

		// check and normalize input parameters
		if (output === undefined || abc === undefined)
			return;
		if (!isArray(output))
			output = [ output ];
		if (parserParams === undefined)
			parserParams = {};
		if (renderParams === undefined)
			renderParams = {};
		var currentTune = renderParams.startingTune ? renderParams.startingTune : 0;

		// parse the abc string
		var book = new ABCJS.TuneBook(abc);
		var abcParser = new window.ABCJS.parse.Parse();

		// output each tune, if it exists. Otherwise clear the div.
		for (var i = 0; i < output.length; i++) {
			var div = output[i];
			if (typeof(div) === "string")
				div = document.getElementById(div);
			if (div) {
				div.innerHTML = "";
				if (currentTune < book.tunes.length) {
					abcParser.parse(book.tunes[currentTune].abc, parserParams);
					var tune = abcParser.getTune();
					ret.push(tune);
					callback(div, tune);
				}
			}
			currentTune++;
		}
		return ret;
	}

	// A quick way to render a tune from javascript when interactivity is not required.
	// This is used when a javascript routine has some abc text that it wants to render
	// in a div or collection of divs. One tune or many can be rendered.
	//
	// parameters:
	//		output: an array of divs that the individual tunes are rendered to.
	//			If the number of tunes exceeds the number of divs in the array, then
	//			only the first tunes are rendered. If the number of divs exceeds the number
	//			of tunes, then the unused divs are cleared. The divs can be passed as either
	//			elements or strings of ids. If ids are passed, then the div MUST exist already.
	//			(if a single element is passed, then it is an implied array of length one.)
	//			(if a null is passed for an element, or the element doesn't exist, then that tune is skipped.)
	//		abc: text representing a tune or an entire tune book in ABC notation.
	//		renderParams: hash of:
	//			startingTune: an index, starting at zero, representing which tune to start rendering at.
	//				(If this element is not present, then rendering starts at zero.)
	//			width: 800 by default. The width in pixels of the output paper
	ABCJS.renderAbc = function(output, abc, parserParams, engraverParams, renderParams) {
		function callback(div, tune) {
			var width = renderParams ? renderParams.width ? renderParams.width : 800 : 800;
			/* jshint -W064 */ var paper = Raphael(div, width, 400); /* jshint +W064 */
			if (engraverParams === undefined)
				engraverParams = {};
			var engraver_controller = new ABCJS.write.Printer(paper, engraverParams);
			engraver_controller.printABC(tune);
		}

		return renderEngine(callback, output, abc, parserParams, renderParams);
	};

	// A quick way to render a tune from javascript when interactivity is not required.
	// This is used when a javascript routine has some abc text that it wants to render
	// in a div or collection of divs. One tune or many can be rendered.
	//
	// parameters:
	//		output: an array of divs that the individual tunes are rendered to.
	//			If the number of tunes exceeds the number of divs in the array, then
	//			only the first tunes are rendered. If the number of divs exceeds the number
	//			of tunes, then the unused divs are cleared. The divs can be passed as either
	//			elements or strings of ids. If ids are passed, then the div MUST exist already.
	//			(if a single element is passed, then it is an implied array of length one.)
	//			(if a null is passed for an element, or the element doesn't exist, then that tune is skipped.)
	//		abc: text representing a tune or an entire tune book in ABC notation.
	//		renderParams: hash of:
	//			startingTune: an index, starting at zero, representing which tune to start rendering at.
	//				(If this element is not present, then rendering starts at zero.)
	ABCJS.renderMidi = function(output, abc, parserParams, midiParams, renderParams) {
		function callback(div, tune) {
			if (midiParams === undefined)
				midiParams = {};
			var midiwriter = new ABCJS.midi.MidiWriter(div, midiParams);
			midiwriter.writeABC(tune);
		}

		return renderEngine(callback, output, abc, parserParams, renderParams);
	};

	function hasClass(element, cls) {
		var elClass = element.getAttribute("class");
		var rclass = /[\t\r\n\f]/g;
		var className = " " + cls + " ";
		return (element.nodeType === 1 && (" " + elClass + " ").replace(rclass, " ").indexOf(className) >= 0);
	}

	function getAllElementsByClasses(startingEl, class1, class2) {
		var els = startingEl.getElementsByClassName(class1);
		var ret = [];
		for (var i = 0; i < els.length; i++) {
			if (hasClass(els[i], class2))
				ret.push(els[i]);
		}
		return ret;
	}

	function getTimerValues(tune, options) {
		// We either want to run the timer once per measure or once per beat. If we run it once per beat we need a multiplier for the measures.
		// So, first we figure out the beats per minute and the beats per measure, then depending on the type of animation, we can
		// calculate the desired interval (ret.tick) and the number of ticks before we want to run the measure
		var bpm;
		if (options.bpm)
			bpm = options.bpm;
		else {
			if (tune && tune.metaText && tune.metaText.tempo && tune.metaText.tempo.bpm)
				bpm = tune.metaText.tempo.bpm;
			else
				bpm = 120;
		}
		var beats = tune.getBeatsPerMeasure();
		if (!beats) // If this is either unmetered, or otherwise a strange piece, we'll just set the beats to 4 so something happens.
			beats = 4;
		var measuresPerMinute = bpm / beats;
		var ret = {};
		if (options.showCursor)
			ret.tick = 60000 / bpm;
		else if (options.hideFinishedMeasures)
			ret.tick = 60000 / measuresPerMinute;

		ret.measureMultiplier = options.showCursor && options.hideFinishedMeasures ? beats : 1;
		return ret;
	}

	// This is a way to manipulate the written music on a timer. Their are two ways to manipulate the music: turn off each measure as it goes by,
	// and put a vertical cursor before the next note to play. The timer works at the speed of the original tempo of the music unless it is overwritten
	// in the options parameter.
	//
	// parameters:
	// paper: the output div that the music is in.
	// tune: the tune object returned by renderAbc.
	// options: a hash containing the following:
	//    hideFinishedMeasures: true or false [ false is the default ]
	//    showCursor: true or false [ false is the default ]
	//    bpm: number of beats per minute [ the default is whatever is in the Q: field ]
	var timerHandle = null;
	ABCJS.startAnimation = function(paper, tune, options) {
		if (paper.getElementsByClassName === undefined) {
			console.error("ABCJS.startAnimation: The first parameter must be a regular DOM element. (Did you pass a jQuery object or an ID?)");
			return;
		}
		if (tune.getBeatsPerMeasure === undefined) {
			console.error("ABCJS.startAnimation: The second parameter must be a single tune. (Did you pass the entire array of tunes?)");
			return;
		}

		var timerValues = getTimerValues(tune, options);

		var currentLine = 0;
		var currentMeasure = 0;
		var measureCounter = 0;
		function processNext() {
			if (++measureCounter < timerValues.measureMultiplier)
				return;
			measureCounter = 0;
			var els = getAllElementsByClasses(paper, "l"+currentLine, "m"+currentMeasure);
			if (els.length === 0) {
				currentLine++;
				currentMeasure = 0;
				els = getAllElementsByClasses(paper, "l"+currentLine, "m"+currentMeasure);
			}

			if (els.length > 0) {
				for (var i = 0; i < els.length; i++) {
					var el = els[i];
					if (!hasClass(el, "bar"))
						el.style.display = "none";
				}
				currentMeasure++;
			} else
				clearInterval(timerHandle);
		}
		timerHandle = setInterval(processNext, timerValues.tick);
	};
	ABCJS.stopAnimation = function() {
		clearInterval(timerHandle);
	};

})();
