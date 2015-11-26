YUI.add('moodle-atto_morebackcolors-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_morebackcolors
 * @copyright  2015 University of Strathclyde
 * @author     Michael Aherne <michael.aherne@strath.ac.uk>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_morebackcolors-button
 */

/**
 * Atto text editor morebackcolors plugin.
 *
 * @namespace M.atto_morebackcolors
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

Y.namespace('M.atto_morebackcolors').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    initializer: function(config) {
        var items = [];
        var colors = this.get('colors');
        Y.Array.each(colors, function(colors) {
            if (colors.trim()) {
                var color_array = colors.split(/\s+/);
                var stringOfDiv = "";
                for (var i = 0; i < color_array.length; i++) {
                    var color = color_array[i].trim();
                    if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)) {
                        stringOfDiv = stringOfDiv +
                        '<div style="width: 20px; margin-right: 5px; height: 20px; border: 1px solid #CCC; background-color: ' +
                        color +
                        '" data-color="' + color + '"></div>';
                    }
                }
                items.push({
                    text: stringOfDiv,
                    callback: this._changeStyle
                });
            }
        });

        this.addToolbarMenu({
            icon: 'e/text_highlight',
            overlayWidth: '4',
            menuColor: '#333333',
            globalItemConfig: {
                callback: this._changeStyle
            },
            items: items
        });
    },

    /**
     * Change the font color to the specified color.
     *
     * @method _changeStyle
     * @param {EventFacade} e
     * @param {string} color The new font color
     * @private
     */
    _changeStyle: function (e) {
        this.get('host').formatSelectionInlineStyle({
            backgroundColor: e.target.getAttribute("data-color")
        });
    }
}, {
    ATTRS: {
        /**
         * The list of available colors
         *
         * @attribute colors
         * @type array
         * @default {}
         */
        colors: {
            value: {}
        }
    }
});

}, '@VERSION@');
