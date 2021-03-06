
import React from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

const Duration = ({ d }) => {
    let h = d.hours(),
        m = d.minutes(),
        s = d.seconds();

    [h, m, s] = [h, m, s].map(n => n < 10 ? `0${n}` : n);

    return <code>{h}:{m}:{s}</code>;
};

const TimeUntil = inject('Clock')(observer(({ until, Clock }) => {
    const duration = moment.duration(until.diff(Clock.time));

    return (
        <div>
            {until.calendar()} comes in <Duration d={duration} />
        </div>
    );
}));

const TimeSince = inject('Clock')(observer(({ since, Clock }) => {
    const duration = moment.duration(Clock.time.diff(since));

    return (
        <div>
            {since.calendar()} was <Duration d={duration} /> ago
        </div>
    );
}));

const CurrentTime = inject('Clock')(observer(({ Clock }) => (
    <div>
        Current Time: <Duration d={Clock.time} />
    </div>
)));

const Time = ({ until, since }) => {
    if (until) {
        return <TimeUntil until={until} />;
    }else if (since) {
        return <TimeSince since={since} />;
    }else{
        return <CurrentTime />;
    }
};

export default Time;
