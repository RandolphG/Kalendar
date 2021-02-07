const baseURL = `https://ll.thespacedevs.com/2.0.0/`;
const previousURL = `launch/previous/?mode=list&ordering=-net&limit=100`;
const upcomingURL = `launch/upcoming/?mode=list&ordering=net&limit=100`;

/**
 * fetch launch data
 * @returns {Promise<*>}
 */
export const getLaunchCalendar = async () => {
  try {
    const prevData = await fetch(`${baseURL}${previousURL}`).then(res => res.json());
    const upcomingData = await fetch(`${baseURL}${upcomingURL}`).then(res => res.json());

    /**
     * generate the launch calendar data structure
     */
    const launchCalendar = [...prevData.results, ...upcomingData.results].reduce(
      (launchCalendar, launchData) => {
        const date = launchData.net;
        const key = generateLaunchCalendarKey(date);
        const monthLaunches = launchCalendar[key];
        const launch = { date: date, title: launchData.name, agency: launchData.lsp_name };

        if (monthLaunches) {
          // an array containing launches for this month already exists.
          monthLaunches.push(launch);
        } else {
          launchCalendar[key] = [launch];
        }

        return launchCalendar;
      },
      {}
    );

    const ttl = 3.6e6;
    localStorage.setItem('launchCalender', JSON.stringify(launchCalendar));
    localStorage.setItem('launchCalendarExpiration', (Date.now() + ttl).toString());

    return launchCalendar;
  } catch (error) {
    console.log(error);
  }
};

const getFirstDayOfMonth = dateTime => {
  const mm = dateTime.substring(5, 7);
  const yyyy = dateTime.substring(0, 4);
  return new Date(`${yyyy}-${mm}-01T00:00:00.000Z`);
};

/**
 *
 * @param dateTime
 * @returns {string|undefined}
 */
const generateLaunchCalendarKey = dateTime => {
  const mm = dateTime.substring(5, 7);
  const yyyy = dateTime.substring(0, 4);

  switch (mm) {
    case '01':
      return `JAN ${yyyy}`;
    case '02':
      return `FEB ${yyyy}`;
    case '03':
      return `MAR ${yyyy}`;
    case '04':
      return `APR ${yyyy}`;
    case '05':
      return `MAY ${yyyy}`;
    case '06':
      return `JUN ${yyyy}`;
    case '07':
      return `JUL ${yyyy}`;
    case '08':
      return `AUG ${yyyy}`;
    case '09':
      return `SEP ${yyyy}`;
    case '10':
      return `OCT ${yyyy}`;
    case '11':
      return `NOV ${yyyy}`;
    case '12':
      return `DEC ${yyyy}`;
    default:
      throw new Error(`month is out of range`);
  }
};

const leapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

function getNumDaysInMonth(isoDate) {
  const date = new Date(isoDate);
  const month = date.getMonth();
  const year = date.getFullYear();
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    case 1:
      return leapYear(year) ? 29 : 28;
    default:
      throw new Error(`month is out of range`);
  }
}

const getWeekday = number => {
  switch (number) {
    case 0:
      return 'SUNDAY';
    case 1:
      return 'MONDAY';
    case 2:
      return 'TUESDAY';
    case 3:
      return 'WEDNESDAY';
    case 4:
      return 'THURSDAY';
    case 5:
      return 'FRIDAY';
    case 6:
      return 'SATURDAY';
    default:
      throw new Error(`day is out of range`);
  }
};

/**
 * return days of month with days and numbers
 * @param date
 * @param launchCalendar
 * @returns {[]}
 */
export const getDaysInMonth = (date, launchCalendar) => {
  const numDays = getNumDaysInMonth(date);
  const dayISOString = date.toISOString();
  const month = generateLaunchCalendarKey(dayISOString);
  const firstDayOfMonth = getFirstDayOfMonth(dayISOString);
  const days = [];

  for (let i = 0, weekdayNumber = firstDayOfMonth.getDay(); i < numDays; i++) {
    days.push({ launches: [], weekday: getWeekday(weekdayNumber) });
    if (weekdayNumber < 6) {
      weekdayNumber++;
    } else {
      weekdayNumber = 0;
    }
  }
  if (!launchCalendar) {
    return days;
  }
  const launchesInMonth = launchCalendar[month];

  launchesInMonth.forEach(launch => {
    const launchDate = new Date(launch.date);
    const dayOfMonth = launchDate.getDate();
    const launchesOnDay = days[dayOfMonth - 1].launches;
    launchesOnDay.push(launch);
  });

  return days;
};

export const slides = [
  {
    title: 'Machu Picchu',
    subtitle: 'Peru',
    description: 'Adventure is never far away',
    image:
      'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'Chamonix',
    subtitle: 'France',
    description: 'Let your dreams come true',
    image:
      'https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'Mimisa Rocks',
    subtitle: 'Australia',
    description: 'A piece of heaven',
    image:
      'https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'Four',
    subtitle: 'Australia',
    description: 'A piece of heaven',
    image:
      'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'Five',
    subtitle: 'Australia',
    description: 'A piece of heaven',
    image:
      'https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
];
