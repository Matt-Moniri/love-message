//---------------------------------------declare function-------------------------------------------------------
//this function is the main function that executes after the form is submitted
//it create the second page elements
function declare() {
  //I create and append the div elements one by one
  //in such an order that there won't be a need for setting z-index

  //Here I create and append a div which will have the background image
  var storyOut = document.createElement("div");
  storyOut.innerHTML = " ";
  storyOut.className = "storyOut p2 image"; //I added image classname because this will have the wallpaper
  document.body.appendChild(storyOut);

  /*here I create a div which will serve as a background 
    to lower the contrast of the wallpaper and make the text readable*/
  var elCanvas = document.createElement("div");
  elCanvas.innerHTML = " ";
  elCanvas.className = "p2 canvas";
  document.body.appendChild(elCanvas);

  /*here I create the text paragraph that contains the love message
    first I create a string and store it in "story" variable. then I write this string as the innerHtml of 
    a new div. As you see the end result is a div inside another div.
    */
  var story = "";

  story += "<p >Hereby I declare that ";
  story +=
    " if I were <br><b>" +
    $("#rich").val() +
    "</b>, I would still choose to live with you forever";
  story +=
    " and give you the <br><b>" +
    $("#expensive").val() +
    "</b> that I had and we would go to ";
  story +=
    "<br><b>" +
    $("#place").val() +
    "</b> to spend the rest of our lives together and I would cook ";
  story += "<br><b>" + $("#food").val() + "</b> for you every day. </p>";

  //After geing the values I needed to make the above paragraph here
  // I remove all the elements of first page including the form objects
  $(".p1 , .wp1").remove();

  //Here I create the div that will contain our love message.
  //and put the "story" variable as an Html inside it
  var elStoryText = document.createElement("div");
  elStoryText.innerHTML = story;
  elStoryText.className = "storyOutText p2 text";
  document.body.appendChild(elStoryText);

  //I call addStars function to append the star divs into the page
  addStars();

  //The shine function changes the opacity of each star
  //I put the shine function in a setInterval to make it repeat every 100ms
  //this makes the star to appear like they are shining
  setInterval(function () {
    shine();
  }, 100);
}
//---------------------------------------end of declare function--------------------------------------------

//---------------------------------------addStars function-------------------------------------------------------
//this function creates 48 divs and each of them will have a star picture in their background
function addStars() {
  var tempString = "";
  var elStar = starsUnit[0].element;
  for (let i = 0; i < 48; i++) {
    elStar = starsUnit[i].element;
    document.body.appendChild(elStar);
    tempString = (Math.floor(i / 12) * 4).toString() + "%";
    $(".star").last().css("top", tempString);
    tempString = ((i % 12) * 2.5 + 45).toString() + "%";
    $(".star").last().css("left", tempString);
  }
  //$(".storyOut").on("click", shine);
  shine();
}
//---------------------------------------end of addStars function--------------------------------------------

//---------------------------------------shine function--------------------------------------------
//This function will execute every 100ms (as set in the "declare" function)
//when the shine function executes once it changes the opacity of each star by a predefined amount
//that predefined amount is defined randomly when creating the array of stars
function shine() {
  var tempString = "";
  var opa = 0;
  var direc = 0;
  var step = 0;
  for (let i = 0; i < 48; i++) {
    tempString = ".s" + i.toString();
    opa = starsUnit[i].opa;
    direc = starsUnit[i].direc;
    step = starsUnit[i].step;
    if (direc == 2) {
      //if direction is "increase" the opacity increases by the "opa" value
      opa += step;
      if (opa > 100) {
        //if it gets more than 100, it is set back to 100 and the direction is reversed
        opa = 100;
        starsUnit[i].direc = 1;
      }
    } else {
      if (direc == 1) {
        //if direction is "decrease" the opacity deceases by the "opa" value
        opa -= step;
        if (opa < 0) {
          //if it gets less than 0, it is set back to 0 and the direction is reversed
          opa = 0;
          starsUnit[i].direc = 2;
        }
      }
    }
    starsUnit[i].opa = opa; // at last it updates the array with new opacity value
    $(tempString).css("opacity", opa.toString() + "%"); //and also updates the css opacity of the div.
  } //end of for (i<48) loop
}
//---------------------------------------end of shine function--------------------------------------------

//---------------------------------------end of makeStars function--------------------------------------------
//This function creates an array of star objects
//each of star objects has several properties:
//opa: the amount of opacity
//direc: the direction in which the opacity will change in the next itteration.
//for direc, 2 means increase and 1 means decrease.
//step: the amount by which the opacity will change in the next itteration
//element: A div element that will be appended to the body of the page
function makeStars() {
  var star = {};
  const steps = [11, 19, 29, 41];
  var stars = new Array();
  var istr = "";
  for (let i = 0; i < 48; i++) {
    star = {};
    star.opa = 0;
    star.direc = 2;
    star.step = steps[Math.floor(4 * Math.random())];
    star.element = document.createElement("div");
    istr = i.toString();
    star.element.className = "star s" + istr; //here I set a className for each star that shows its index
    stars.push(star);
  }
  return stars;
}
//---------------------------------------end of makeStars function--------------------------------------------

//---------------------------------------correct function--------------------------------------------
//this function checks the validity of the form in first page
function correct() {
  var valid = true; //the initial value of the "valid" variable is true
  var hint = "";
  var allEntries = "";
  if (
    !$("#rich").val() |
    !$("#expensive").val() |
    !$("#place").val() |
    !$("#food").val()
  ) {
    valid = false; //if any field is empty, it will make the "valid" false.
    hint += "<p>Please fill all the fields!</p>";
  }

  if (!$("input[type='checkbox']").is(":checked")) {
    valid = false; //if the checkbox is empty, it will make the "valid" false.
    hint += "<p> Please accept the terms and conditions!</p>";
  }
  allEntries =
    $("#rich").val() +
    $("#expensive").val() +
    $("#place").val() +
    $("#food").val();
  if (/[%&<>\[\]{}]/.test(allEntries)) {
    hint +=
      "<p>These characters are not allowed: &nbsp&nbsp&nbsp %&<>[]{} </p>";
    valid = false;
  }

  //validate inputs length for later
  /*$(".tInputField").each(function() {
        var entry = "";
        entry = $(this).val();
        /^.{1,15}\s.{1,15}$/.test(entry)|/^.{1,15}$/ ;
    })*/

  //if the "valid" is still true we it activates "declare" function
  //which wipes first pages and brings up second page
  if (valid == true) {
    declare();
  } else {
    $("div.output").html(hint);
  } //end if declare/hint
}
//---------------------------------------end of correct function--------------------------------------------

//---------------------------------------root--------------------------------------------------------------------------

//in the root part of the code first I make an array of stars using the makeStars() function
var starsUnit = makeStars();

//I put a listener on the "next button" that will activate "correct" function
$("input.nextButton").on("click", correct);
