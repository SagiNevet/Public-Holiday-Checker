import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [location, setLocation] = useState(''); // Reintroducing location
  const [holidayType, setHolidayType] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState('');

  // New state for "From Date" and "To Date"
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/api/countries');
        setCountries(response.data.response.countries);
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  const fetchHolidays = async () => {
    // Clear previous holidays before fetching new data
    setHolidays([]);
    setError('');  // Clear any previous error messages

    const countryCode = country.split(' ').pop().replace('(', '').replace(')', '');

    if (!countryCode) {
      setError('Please enter a valid country.');
      return;
    }

    if (!year) {
      setError('Please select a valid year.');
      return;
    }

    try {
      const response = await axios.get('/api/holidays', {
        params: {
          country: countryCode,
          year,
          month: month || undefined,
          day: day || undefined,
          location: location || undefined, // Add location back
          type: holidayType || undefined,
        },
      });

      if (response.data.length === 0) {
        setError('No holidays found for the selected criteria');
      } else {
        const allHolidays = response.data;
        // Apply date filtering logic
        const filteredHolidays = filterHolidaysByDate(allHolidays);
        setHolidays(filteredHolidays);  // Set the new holidays data
        setError('');  // Clear any previous errors
      }
    } catch (err) {
      console.error('Error fetching holidays:', err);
      setError('Failed to fetch holidays. Please try again.');
      setHolidays([]);  // Reset holidays array if there's an error
    }
  };


  // Helper function to filter holidays by the selected date range
  const filterHolidaysByDate = (holidays) => {
    if (!fromDate || !toDate) {
      return holidays;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    return holidays.filter((holiday) => {
      const holidayDate = new Date(holiday.date.iso);
      return holidayDate >= from && holidayDate <= to;
    });
  };

  // Helper function to format dates as "dd/mm/yyyy"
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const holidayTypes = [
    { label: 'All Types', value: '' },
    { label: 'National', value: 'national' },
    { label: 'Local', value: 'local' },
    { label: 'Religious', value: 'religious' },
    { label: 'Observance', value: 'observance' },
  ];

    // Filter out duplicate holidays by name and date
    const uniqueHolidays = holidays.filter(
      (holiday, index, self) =>
        index === self.findIndex((h) => h.name === holiday.name && h.date.iso === holiday.date.iso)
    );


  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Worldwide Holidays Finder</h1>

      <div className={styles.form}>
        <label className={`${styles.formLabel} ${styles.formFullRow}`}>Country: </label>
        <input
          className={`${styles.formInput} ${styles.formFullRow}`}
          list="country-options"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Type a country"
        />
        <datalist id="country-options">
          {countries.map((country, index) => (
            <option key={index} value={`${country.country_name} (${country['iso-3166']})`} />
          ))}
        </datalist>

        <label className={styles.formLabel}>Year: </label>
        <input
          className={styles.formInput}
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <label className={styles.formLabel}>Month: </label>
        <input
          className={styles.formInput}
          type="number"
          placeholder="(1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <label className={styles.formLabel}>Day: </label>
        <input
          className={styles.formInput}
          type="number"
          placeholder="(1-31)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />

        {/* Location Input */}
        <label className={styles.formLabel}>Location (State/Region): </label>
        <input
          className={styles.formInput}
          type="text"
          placeholder="e.g., us-ny"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Section for Date Range */}
        <div className={styles.formFullRow}>
          <h2>By Specific Dates:</h2>
        </div>

        {/* New From Date Input */}
        <label className={styles.formLabel}>From Date: </label>
        <input
          className={styles.formInput}
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        {/* New To Date Input */}
        <label className={styles.formLabel}>To Date: </label>
        <input
          className={styles.formInput}
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <label className={styles.formLabel}>Holiday Type: </label>
        <select className={styles.formInput} value={holidayType} onChange={(e) => setHolidayType(e.target.value)}>
          {holidayTypes.map((type, index) => (
            <option key={index} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <button className={`${styles.fetchBtn} ${styles.formFullRow}`} onClick={fetchHolidays}>Show Holidays</button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.holidayList}>
        {uniqueHolidays.map((holiday, index) => (
          <li key={`${holiday.name}-${holiday.date.iso}-${index}`} className={styles.holidayItem}>
            <h3 className={styles.holidayName}>{holiday.name}</h3>
            <p className={styles.holidayDescription}>{holiday.description || 'No description available'}</p>
            <p className={styles.holidayDate}><strong>Date:</strong> {formatDate(holiday.date.iso)}</p>
            <p className={styles.holidayType}><strong>Type:</strong> {holiday.type.join(', ')}</p>

            {/* Add a Google Search Link */}
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(holiday.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.holidayLink}
            >
              Learn More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
