/*
using rgb values for the custom accent system allows for more freedom design-wise, 
but using hex codes easier & more familiar to end users
so we're gonna the --main-accent hex code over to rgb values and store them as variables  
*/
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/* jcink will let us pull this in global variables so we'll deal with that later */
/* let mainAccent = "#df6885";

var mainAccentR = hexToRgb(mainAccent).r.toString();
document.querySelector(":root").style.setProperty('--mainAccentR', mainAccentR);
var mainAccentG = hexToRgb(mainAccent).g.toString();
document.querySelector(":root").style.setProperty('--mainAccentG', mainAccentG);
var mainAccentB = hexToRgb(mainAccent).b.toString();
document.querySelector(":root").style.setProperty('--mainAccentB', mainAccentB); */


// censor stuff
let mainProfileCensorToggle = document.querySelector('cw-toggle');
let mainProfileCensor = document.querySelectorAll('censor');
document.querySelectorAll('censor').forEach(x=>x.classList.add('omenscensorshowcontent'));
document.querySelectorAll('cw-toggle').forEach(x=>x.classList.add('omensbuttonhidecontent'));

function censorToggle(cwButtonElement, censorElement) {
	cwButtonElement.toggle('omensbuttonshowcontent');
	censorElement.forEach(x=>x.classList.toggle('omensbuttonhidecontent'));
};
$(function(){
  $('cw-toggle').click(function() {
$(this).toggleClass('omensbuttonhidecontent omensbuttonshowcontent');
$('censor').toggleClass('omenscensorshowcontent omenscensorhidecontent');
  }); 
});




/*
FOR THE LOVE OF GOD, REDO THIS SCRIPTING
*/
$(function() {
  $("#header-ouija, #moon-deco, #h-image, #h-blurb, #h-left-shape, #h-updates-contain, #h-staffcensus-contain, #h-credits-contain").removeClass();
  $("#header-ouija").addClass("intro");
  $("#moon-deco").addClass("intro");
    $("#h-image").addClass("intro");
  $("#h-blurb").addClass("intro");
});

$("#h-intro").click(function toggleIntro() {
  $("#header-ouija, #moon-deco, #h-image, #h-blurb, #h-left-shape, #h-updates-contain, #h-staffcensus-contain, #h-credits-contain").removeClass();
  $("#header-ouija").addClass("intro");
  $("#moon-deco").addClass("intro");
    $("#h-image").addClass("intro");
  $("#h-blurb").addClass("intro");
});

$("#h-staff").click(function toggleStaff() {
  $("#header-ouija, #moon-deco, #h-image, #h-blurb, #h-left-shape, #h-updates-contain, #h-staffcensus-contain, #h-credits-contain").removeClass();
  $("#header-ouija").addClass("staff");
  $("#moon-deco").addClass("staff");
  $("#h-left-shape").addClass("staff");
    $("#h-staffcensus-contain").addClass("staff");
});

$("#h-credits").click(function toggleCredit() {
  $("#header-ouija, #moon-deco, #h-image, #h-blurb, #h-left-shape, #h-updates-contain, #h-staffcensus-contain, #h-credits-contain").removeClass();
    $("#header-ouija").addClass("credits");
  $("#moon-deco").addClass("credits");
  $("#h-image").addClass("credits");
  $("#h-left-shape").addClass("credits");
    $("#h-credits-contain").addClass("credits");
});

$("#h-updates").click(function toggleUpdates() {
  $("#header-ouija, #moon-deco, #h-image, #h-blurb, #h-left-shape, #h-updates-contain, #h-staffcensus-contain, #h-credits-contain").removeClass();
  $("#header-ouija").addClass("updates");
  $("#moon-deco").addClass("updates");
  $("#h-left-shape").addClass("updates");
  $("#h-updates-contain").addClass("updates");
});

// scroll bottom, scroll top

$("#elevator-up").click(function() {
$('html, body').scrollTop(0);
});

$("#elevator-down").click(function() {
$('html, body').scrollTop($(document).height());
});

// jerry rig time

var $toggleButton = $("#sidebar-toggle");
var $pushSelectors = $("#first-sidebar, #second-sidebar");
// Set up an empty global variable to store the state later
var sidebarIsOpen;

// -----------------------------------------------------------------------------

/**
 * Default state for the sidebar.
 * ---
 * NOTE: Use "true" to set the sidebar to be open by default, and "false" to set
 *       it to be closed by default.
 */
var openSidebarOnLoad = false;

// -----------------------------------------------------------------------------

// Set up a function to be used by the click event on $toggleButton
function toggleSidebar() {

  /**
   * Alternate sidebarIsOpen between true/false on each click.
   * ---
   * NOTE: This needs to happen before checking if the sidebar is open so that
   *       the localStorage items will be added in the right sequence.
   */  
  sidebarIsOpen = !sidebarIsOpen;

  // Check if the content has the "open-on-load" class
  if ($pushSelectors.hasClass('open-on-load')) {

    // If it does, remove the class so that we can add the "open" class later
    $pushSelectors.removeClass('open-on-load');

    // Let's send a message to the console to let us know what happened
    console.log('The \'open-on-load\' class has been removed.');

  }
  
  // Check if the sidebar should be open
  if (sidebarIsOpen) {

    /**
     * If the sidebar should be open, we'll add a class to the content to
     * animate the sidebar into the "open" position.
     */
    $pushSelectors.addClass('open');
    $pushSelectors.removeClass('closed');
 
    /**
     * We will also add the "opened" state to a localStorage item. This is the
     * property that tells the browser that the menu should be open.
     * ---
     * NOTE: localStorage will only store strings, we can use "opened" and
     *       "closed" as values to determine which state should be set.
     */
    localStorage.setItem('sidebar', 'opened');
    //                          ^             ^
    //                         key          value

    // And send a message to the console to let us know...
    console.log('The \'opened\' storage item has been set.');

  } else {

    /**
     * If the sidebar should not be open, we'll remove the "open" class from
     * the content which will animate the sidebar back into the
     * "closed" position.
     */
    $pushSelectors.removeClass('open');
    $pushSelectors.addClass('closed');

    // Now set the storage item to "closed"...
    localStorage.setItem('sidebar', 'closed');

    // And send a message to the console to let us know...
    console.log('The \'closed\' storage item has been set.');

  }
}

// Next we'll need to check if the storage item exists at all
if (localStorage.getItem('sidebar') === null) {

  /**
   * If it doesn't, this means that our dear user has not yet visited the page,
   * so we should set the state to what ever the default state is.
   * ---
   * NOTE: This will also be the case if the user's browser is set to reject
   *       cookies, which includes localStorage.
   */
  sidebarIsOpen = openSidebarOnLoad;

  // And send a message to the console to let us know...
  console.log('The default state is ' + openSidebarOnLoad);

} else {

  // If the storage item does exist, and the value is set to "opened"...
  if (localStorage.getItem('sidebar') === 'opened') {

    // Set the state to open
    sidebarIsOpen = true;

    // And send a message to the console to let us know...
    console.log('The \'opened\' storage item is set; the sidebar should be open.');

  } else {

    // Otherwise, the value should be "closed"; set the state accordingly
    sidebarIsOpen = false;

    // And send a message to the console to let us know...
    console.log('The \'closed\' storage item is set; the sidebar should be closed.');

  }
}

// Does the "opened" storage item exist, or is the default state true?
if (sidebarIsOpen) {

  /**
   * If so, the sidebar should be open when the page loads, so add the
   * "open-on-load" class to content to animate the sidebar into position.
   */
  $pushSelectors.addClass('open-on-load');

  // Let's have the console tell us what's happening...
  console.log('The \'open-on-load\' class has been added.');

}

/**
 * Finally, fire the toggleSidebar function on each click.
 * ---
 * NOTE: This is called last so that the script will first check against all
 *       other conditions, before doing any actual toggling.
 */
$toggleButton.on('click', toggleSidebar);