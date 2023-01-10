$(function () {
  var timeBlock = $('.time-block');
  var textArea = $('.description');

  // Acceptance Criteria --- refresh the page, saved events persist
  // get events from localStorage
  function getSchedule() {
    var events = localStorage.getItem('schedules');

    if (events) {
      events = JSON.parse(events);
    } else {
      events = [];
    }
    return events;
  }

  // Acceptance Criteria --- click the save button for that timeblock, text for that event is saved in local storage
  // store events from localStorage
  function storeSchedule(events) {
    localStorage.setItem('schedules', JSON.stringify(events));
  }

  function createSchedule (event) {
    event.preventDefault();

    // get time-block div Id
    var hour = $('#' + this.parentNode.id).attr('id');
    var description = $('#' + this.parentNode.id  + ' .description').val().trim();

    var newSchedule = {
      scheduleHour: hour,
      scheduleDescription: description
    }
    var events = getSchedule();
    events.push(newSchedule);

    storeSchedule(events);
    printSchedule();
  }

  // when localStorage is empty, errors occur
  function printSchedule() {
    // clear displaying element
    textArea.empty();
    // get events from localStorage
    var events = getSchedule();
    // update color of time-blocks according to dayjs to add/remove past, present, and future
    updateTime();
    // iterate over events array and create rows
    if (Array.isArray(events) && events.length !== 0) {
      for (var i = 0; i < events.length; i ++) {
        for (var j = 0; j < timeBlock.length; j++) {
          if (events[i].scheduleHour === timeBlock[j].id) {
            timeBlock[j].children[1].textContent = events[i].scheduleDescription;
          }
        }
      }
    } else {
      return;
    }
  }
  
  // check current hour with dayjs and compare with id of timeblock
  function updateTime () {
    // get current hour with dayjs
    // var currentHour = parseInt(dayjs().format('HH'));
    var currentHour = 15;
    // Acceptance Criteria --- view the timeblocks for that day, each timeblock is color coded to indicate whether it is in the past, present, or future
    for (var i = 0; i < timeBlock.length; i++) {
      // get timeblock hour
      const currentTimeBlockHour = parseInt(timeBlock[i].getAttribute('id').split('hour-').join(''));

      // compare timeblock hour with current hour
      if (currentTimeBlockHour === currentHour){
        timeBlock[i].classList.remove('past');
        timeBlock[i].classList.remove('future');
        timeBlock[i].classList.add('present');
      } else if (currentTimeBlockHour > currentHour) {
        timeBlock[i].classList.remove('past');
        timeBlock[i].classList.add('future');
        timeBlock[i].classList.remove('present');
      } else {
        timeBlock[i].classList.add('past');
        timeBlock[i].classList.remove('future');
        timeBlock[i].classList.remove('present');
      }
    }
  }

  // Acceptance Criteria --- click into a timeblock, can enter an event
  // Acceptance Criteria --- click the save button for that timeblock, text for that event is saved in local storage
  timeBlock.on('click', '.saveBtn', createSchedule);
  // Acceptance Criteria --- current day is displayed at the top of the calendar
  var currentDay = dayjs().format('dddd MMM D, YYYY hh:mm');
  $('#currentDay').text(currentDay);

  setInterval(printSchedule, 1000);
});








// dynamically generate time-blocks  
// {/* <div id="hour-9" class="row time-block past">
// <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
// <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
// <button class="btn saveBtn col-2 col-md-1" aria-label="save">
//   <i class="fas fa-save" aria-hidden="true"></i>
// </button>
// </div> */}

// update localStorage
// for (var i = 0; i < events.length; i++) {
//   events = getSchedule();
//   console.log('new event hour is ', hour);
//   console.log('events has', events);
//   var event = events[i];
//   if (event.scheduleHour === hour) {
//     events.splice(i, 1);
//     localStorage.removeItem('schedules');
//     storeSchedule();
//   }
// }