"use strict";

/*
// Accepts: Object
// Returns: Number
// with Object size
*/
var objLength = function( obj ) {

    var key;
    var size = 0;

    for ( key in obj ) {
        if( obj.hasOwnProperty( key ) ) {
            size++;
        }
    }

    return size;

};

/*
// Accepts: String
// Returns: Number
// with Unique string count
*/
var uniqueCharCount = function ( str ) {

    var letters = {};

    for ( var x = 0; x < str.length; x++ ) {
        var l = str.charAt( x );

        if ( isNaN( l ) ) {
            letters[l] = ( isNaN(letters[l]) ? 1 : letters[l] + 1 );
        }
    }

    var charCount = objLength( letters );

    return charCount;

};

/*
// Accepts: String
// Returns: String
// with the first letter of the word,
// the count of distinct letters between the first and last letter,
// and the last letter of the word
*/
var createNewWord = function ( str ) {

    var strFinal = "";

    // check if new word needs unique middle character count
    if ( str.length <= 2 ) {

        // return just characters when unique count is not needed
        if ( str.length === 1 ) {
            strFinal = str.charAt( 0 );
        } else {
            strFinal = str.charAt( 0 );
            strFinal = strFinal + str.charAt( 1 );
        }

    } else {

        var strMiddleChars = "";

        var strFirst = str.charAt( 0 );
        var strLast  = str.charAt( str.length - 1 );

        // create string of characters that need unique count
        for ( var x = 1; x < str.length - 1; x++ ) {
            strMiddleChars = strMiddleChars + str.charAt( x );
        }

        // get the unique character count for the word
        var strMiddle = uniqueCharCount( strMiddleChars );

        // create word with first character, unique char count, last letter
        strFinal  = strFirst + strMiddle + strLast;

    }

    return strFinal;

};

/*
// Accepts: String
// Returns: String
// with combined transformed values and delimiters
*/
var createNewString = function ( str ) {

    var strFinal = "";

    // Create array of words from alphanumeric characters
    var arrChars = str.split(/[^A-Za-z]+/);

    // Create array of delimiters from non-alphanumeric characters
    var delimiters = str.split(/[A-Za-z]+/);

    // Use the longer array length to determine how many times to loop
    var length = ( arrChars.length >= delimiters.length ? arrChars.length : delimiters.length );

    for ( var index = 0; index < length; ++index ) {

        var str = "";
        var delimiter;

        // add the next delimiter to the final string
        if ( delimiters[index] ) {

            // the blank values created from the split function are needed to preserve the order
            if ( delimiters[index] === "" ) {
                strFinal = strFinal + "";
            } else {
                delimiter = delimiters[index];
                strFinal  = strFinal + delimiter;
            }

        }

        // add the next transformed string to the final string
        if( arrChars[index] ) {

            // the blank values created from the split function are needed to preserve the order
            if( arrChars[index] === "" ) {
                strFinal = strFinal + "";
            } else {
                str      = arrChars[index];
                strFinal = strFinal + createNewWord( str );
            }

        }
    }

    return strFinal;

};

// test with different strings
var strRaw    = "automotive";
var newString = createNewString( strRaw );
console.log( "initial string='"+strRaw+"'", "new string='"+newString+"'" );

var strRaw    = "123";
var newString = createNewString( strRaw );
console.log( "initial string='"+strRaw+"'", "new string='"+newString+"'" );

var strRaw    = "123automotive";
var newString = createNewString( strRaw );
console.log( "initial string='"+strRaw+"'", "new string='"+newString+"'" );

var strRaw    = "automotive123";
var newString = createNewString( strRaw );
console.log( "initial string='"+strRaw+"'", "new string='"+newString+"'" );

var strRaw    = "wx123yz";
var newString = createNewString( strRaw );
console.log( "initial string='"+strRaw+"'", "new string='"+newString+"'" );

var strRaw    = "test!!Dealer**Track";
var newString = createNewString( strRaw );
console.log( "initial string='"+strRaw+"'", "new string='"+newString+"'" );
