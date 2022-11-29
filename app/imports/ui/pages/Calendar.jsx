import React from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { EVENTS } from './events';

const Calendar = () => (
  <Scheduler events={EVENTS} />
);

export default Calendar;
