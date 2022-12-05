import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from '@daypilot/daypilot-lite-react';
import './CalendarStyles.css';
import { PageIDs } from '../utilities/ids';
import { Sessions } from '../../api/sessions/Sessions';

const styles = {
  wrap: {
    display: 'flex',
  },
  left: {
    marginRight: '10px',
  },
  main: {
    flexGrow: '1',
  },
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: 'Week',
      durationBarVisible: false,
      timeRangeSelectedHandling: 'Enabled',
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1');
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
        });
      },
      eventDeleteHandling: 'Update',
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt('Update event text:', args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  componentDidMount() {

    // const events = [
    //   {
    //     id: 1,
    //     text: 'Event 1',
    //     start: '2022-06-07T10:30:00',
    //     end: '2022-06-07T13:00:00',
    //   },
    //   {
    //     id: 2,
    //     text: 'Event 2',
    //     start: '2022-06-08T09:30:00',
    //     end: '2022-06-08T11:30:00',
    //     backColor: '#6aa84f',
    //   },
    //   {
    //     id: 3,
    //     text: 'Event 3',
    //     start: '2022-06-08T09:30:00',
    //     end: '2022-06-08T15:00:00',
    //     backColor: '#f1c232',
    //   },
    //   {
    //     id: 4,
    //     text: 'Event 4',
    //     start: '2022-06-06T11:30:00',
    //     end: '2022-06-06T14:30:00',
    //     backColor: '#cc4125',
    //   },
    // ];
    Meteor.subscribe(Sessions.userPublicationName);

    const doc_id = ['1'];
    const events = [];
    console.log('data: ');
    console.log(Sessions.collection.findOne({ id: 1 }));
    /* for (let i = 0; i < doc_id.length; i++) {
      console.log(`here is doc id: ${doc_id[i]}`);
      events.push(Sessions.collection.find({ id: doc_id[i] }));
      console.log(`here is events: ${events}`);
      console.log(JSON.stringify(Sessions.collection.find({ id: doc_id[i] }).fetch()));
    } */
    const date = new Date();

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    const startDate = currentDate;
    this.calendar.update({ startDate, events });

  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  render() {
    const date = new Date();

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDate = `${year}-${month}-${day}`;
    return (
      <div style={styles.wrap} id={PageIDs.calendarPage} className="page">
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode="week"
            showMonths={3}
            skipMonths={3}
            startDate={currentDate}
            selectionDay={currentDate}
            onTimeRangeSelected={args => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
