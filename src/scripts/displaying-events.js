import { events } from './storage.js';

export { displayEvents };

function displayEvents(events) {
    
    return events.map(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('day-event');

        const title = event.title;
        const dateFrom = event.dateFrom;
        const dateTo = event.dateTo;
        const description = event.description;

        eventDiv.innerHTML = `${title}<br>
            ${dateFrom.getHours()}:${dateFrom.getMinutes()} - 
            ${dateTo.getHours()}:${dateTo.getMinutes()}<br>
            ${description}`;

        const allHours =  document.querySelectorAll('.calendar__hour-bar');
        let hourBar = [...allHours].find(event => {
                let id = `${dateFrom.getDay()}${dateFrom.getHours()}`;
                return event.dataset.id == id;
        });

        let dateOfbar = new Date(hourBar.dataset.date).getDate();
        if (dateOfbar == dateFrom.getDate()) {
            hourBar.append(eventDiv);
        }

        const divSize = (dateTo - dateFrom) / 1000 / 60;
        eventDiv.style.height = `${divSize}px`;

        const divMargin = dateFrom.getMinutes();
        eventDiv.style.marginTop = `${divMargin}px`;
    });
}

function createNewEventObjects(event) {
    const firstToYear = new Date(event.dateFrom).getFullYear();
    const firstToMonth = new Date(event.dateFrom).getMonth();
    const firstToDate = new Date(event.dateFrom).getDate();
    const firstToFullDate = new Date(firstToYear, firstToMonth, firstToDate, 23, 59);
    
    const secondFromYear = new Date(event.dateTo).getFullYear();
    const secondFromMonth = new Date(event.dateTo).getMonth();
    const secondFromDate = new Date(event.dateTo).getDate();
    const secondFromFullDate = new Date(secondFromYear, secondFromMonth, secondFromDate);
    const id = Math.floor(Math.random() * 1000);

    const firstObjectEvent = {
        title: event.title,
        dateFrom: event.dateFrom,
        dateTo: firstToFullDate,
        description: event.description,
        id: id,
    };

    const secondObjectEvent = {
        title: event.title,
        dateFrom: secondFromFullDate,
        dateTo: event.dateTo,
        description: event.description,
        id: id,
    };

    events.push(firstObjectEvent, secondObjectEvent);
};

function renderNewSplitedEvents(events) {
    events.forEach((event, index) => {

        if (event.dateFrom.getDate() !== event.dateTo.getDate()) {
            events.splice(index, 1);
            createNewEventObjects(event); 
        }
    });
};
renderNewSplitedEvents(events);

function renderNewEvents(events) {
    return renderNewSplitedEvents(events); 
};
renderNewEvents(events);