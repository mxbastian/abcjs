(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{557:function(t,a,e){"use strict";e.r(a);var n=e(43),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"abc-music-notation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#abc-music-notation"}},[t._v("#")]),t._v(" ABC Music Notation")]),t._v(" "),e("p",[t._v("The input to "),e("strong",[t._v("abcjs")]),t._v(" is mostly standard ABC Music Notation. That notation is described here:")]),t._v(" "),e("p",[e("a",{attrs:{href:"http://abcnotation.com/learn",target:"_blank",rel:"noopener noreferrer"}},[t._v("ABC Notation"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("The working document for the standard is "),e("a",{attrs:{href:"https://abcnotation.com/wiki/abc:standard",target:"_blank",rel:"noopener noreferrer"}},[t._v("ABC Standard"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("In addition, there are many informal additions, particularly with new "),e("code",[t._v("%%")]),t._v(" directives, that are supported to be compatible with other ABC software.")]),t._v(" "),e("h2",{attrs:{id:"subtractions-from-the-standard"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#subtractions-from-the-standard"}},[t._v("#")]),t._v(" Subtractions from the standard")]),t._v(" "),e("p",[t._v("We've made an attempt to be compatible with other ABC software, but there are some exceptions.")]),t._v(" "),e("p",[t._v("Some of the things that are supported by other packages are specific to that package's environment and don't apply to a web-based solution. Those features are not supported.")]),t._v(" "),e("p",[t._v("Here is a list of formatting options that will probably not be supported:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("%%abc\n%%abc2pscompat\n%%abcm2ps\n%%autoclef\n%%beginps\n%%beginsvg\n%%bgcolor\n%%break\n%%breaklimit\n%%breakoneoln\n%%clip\n%%deco\n%%decoration\n%%eps\n%%format\n%%fullsvg\n%%map\n%%micronewps\n%%pango\n%%pdfmark\n%%ps\n%%select\n%%tune\n%%voicemap\n")])])]),e("p",[t._v("Some of the things that are supported by other packages we've just not gotten around to supporting yet. If you run into a feature that you would like to see, let us know.")]),t._v(" "),e("h2",{attrs:{id:"additions-to-the-standard"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#additions-to-the-standard"}},[t._v("#")]),t._v(" Additions to the standard")]),t._v(" "),e("h3",{attrs:{id:"alternate-note-heads"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#alternate-note-heads"}},[t._v("#")]),t._v(" Alternate note heads:")]),t._v(" "),e("p",[t._v("In both the K: and the V: element, you can include the parameter:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("style=rhythm\nstyle=harmonic\nstyle=x\nstyle=normal\n")])])]),e("p",[t._v("You can also use the above as a decoration to a single note to affect just that note:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("!style=rhythm!\n")])])]),e("p",[t._v("This changes the note heads to a different shape.")]),t._v(" "),e("p",[t._v("Here's a sample:")]),t._v(" "),e("show-and-render-abc",{attrs:{abc:'X:1\nT:alternate heads\nM:C\nL:1/8\nU:n=!style=normal!\nK:C treble style=rhythm\n"Am" BBBB B2 B>B | "Dm" B2 B/B/B "C" B4 |"Am" B2 nGnB B2 nGnA | "Dm" nDB/B/ nDB/B/ "C" nCB/B/ nCB/B/ |B8| B0 B0 B0 B0 |]\n%%text This translates to:\n[M:C][K:style=normal]\n[A,EAce][A,EAce][A,EAce][A,EAce] [A,EAce]2 [A,EAce]>[A,EAce] |[DAdf]2 [DAdf]/[DAdf]/[DAdf] [CEGce]4 |[A,EAce]2 GA [A,EAce] GA |D[DAdf]/[DAdf]/ D[DAdf]/[DAdf]/ C [CEGce]/[CEGce]/ C[CEGce]/[CEGce]/ |[CEGce]8 | [CEGce]2 [CEGce]2 [CEGce]2 [CEGce]2 |]\nGAB2 !style=harmonic![gb]4|GAB2 [K: style=harmonic]gbgb|\n[K: style=x]\nC/A,/ C/C/E C/zz2|\nw:Rock-y did-nt like that\n'}}),t._v(" "),e("h3",{attrs:{id:"marcato"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#marcato"}},[t._v("#")]),t._v(" marcato:")]),t._v(" "),e("p",[t._v("A new decoration is supported:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("!marcato!\n")])])]),e("render-abc",{attrs:{abc:"X:1\nK:C\n!marcato!f|\n"}}),t._v(" "),e("h3",{attrs:{id:"chord-break"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#chord-break"}},[t._v("#")]),t._v(" Chord Break:")]),t._v(" "),e("p",[t._v("If you want to skip a chord, then use one of the following as the chord:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('"^break"\n"^(break)"\n"^no chord"\n"^n.c."\n"^tacet"\n')])])]),e("render-abc",{ref:"tune",attrs:{abc:'X:1\nT:Struttin With Some BBQ\nC:1923 Lil Hardin Armstrong\nM:4/4\nL:1/8\nK:F\n"G7"d4AFGA|dA-A6|"C7"cB"^N.C."GF EDC=B,|_B,2zF EFAc|\n'}}),t._v(" "),e("render-audio",{attrs:{obj:t.$refs}}),t._v(" "),e("p",[t._v("These are case-insensitive.")]),t._v(" "),e("h3",{attrs:{id:"mark"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mark"}},[t._v("#")]),t._v(" mark:")]),t._v(" "),e("p",[t._v('To arbitrarily add the class "mark" to the next note, you can use the decoration:')]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("!mark!\n")])])]),e("render-abc",{attrs:{abc:"X:1\nK:C\ne!mark!f|g\n"}})],1)}),[],!1,null,null,null);a.default=r.exports}}]);