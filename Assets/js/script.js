var hourBlockAreaText;
var currentHour = dayjs().format("H");
var today = $("#current-day");
var currentDay = dayjs().format("dddd, MMM D, YYYY");
today.text(currentDay);
$("#current-hour").text(currentHour);

function init() {
  buildHourBlocks();
  populateTextAreas();
}

function buildHourBlocks() {
  var hourBlockID = 9;
  var timeBlocksText = [9,10,11,12,1,2,3,4,5];
  for (i in timeBlocksText) {
    var timeBlockTime = timeBlocksText[i];
    if (i <= 2) {
      timeBlockTime += "AM";
    } else {
      timeBlockTime += "PM"
    }

    var hourBlockEl = "";
    hourBlockEl += '<div id="hour-' + hourBlockID + '" class="row time-block">';
    hourBlockEl += '<div class="col-2 col-md-1 hour text-center py-3">' + timeBlockTime + "</div>";
    hourBlockEl += '<textarea class="col-8 col-md-10 description" rows="3"></textarea>';
    hourBlockEl += '<button class="btn saveBtn col-2 col-md-1" aria-label="save">';
    hourBlockEl += '<i class="fas fa-save" aria-hidden="true"></i>';
    hourBlockEl += "</button>";
    hourBlockEl += "</div>";
    $("#hour-block-container").append(hourBlockEl);
    hourBlockID++;
  }
}

function populateTextAreas() {
  hourBlockAreaText = {...localStorage};
  for (i in hourBlockAreaText) {
    $(".time-block").each(function () {
      var content = hourBlockAreaText[$(this).attr("id")];
      $(this).children("textarea").val(content);
    });
  }
}

function applyHourBlockColor() {
  $(".time-block").each(function () {
    var hourID = $(this).attr("id").split("-")[1];
    if (hourID < currentHour) {
      $(this).addClass("past");
    } else if (hourID == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  })
}

$(document).ready(function() {
  init();
  setInterval(applyHourBlockColor, 1000);

  $(".time-block .saveBtn").on("click", function () {
    var textAreaID = $(this).parents(".time-block").attr("id");
    var textAreaText = $(this).siblings("textarea").val();
    localStorage.setItem(textAreaID, textAreaText);
  });
})



