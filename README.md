
# Worldwide Holidays Finder

This project is a web application built with built with Next.js, JavaScript, React, and the Calendarific API—this project includes a responsive design for optimal viewing on any device, along with a user-friendly UI/UX.
It also leverages version control with Git and GitHub for easy collaboration and deployment.
The project allows users to check public holidays for different countries.
Users can filter holidays by date ranges, type, and location.
Additionally, each holiday entry includes a "Learn More" button that redirects users to a Google search for more information about the holiday.

## Features
- **Search Holidays**: Find holidays by selecting a country and year.
- **Filter by Date**: Narrow down holidays by month, day, or a specific date range.
- **Filter by Type**: Choose holiday types such as National, Local, Religious, or Observance.
- **Learn More**: Clickable links that direct users to Google for more details about each holiday.

## Demo Video
Check out the demonstration of how to use the **Worldwide Holidays Finder**:

[![Worldwide Holidays Finder Demonstration](https://img.youtube.com/vi/S-bNmzzNPXw/0.jpg)](https://youtu.be/S-bNmzzNPXw)

Alternatively, you can watch the video here: [Worldwide Holidays Finder Demonstration](https://youtu.be/S-bNmzzNPXw)

## Requirements
- **Node.js** version 20.18.0 (or higher)
- **npm** version 10.8.2 (or higher)
- **Calendarific API Key**

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/holiday-checker.git
   cd holiday-checker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root of the project and add your **Calendarific API Key**:
   ```bash
   NEXT_PUBLIC_API_KEY=your_calendarific_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage
1. **Select a Country and Year**
   - Choose the desired country from the dropdown list.
   - Enter the year for which you want to check the holidays.

2. **Filter Holidays (Optional)**
   - **By Month and Day**: Enter specific month and/or day to narrow down the results.
   - **By Specific Dates**: Use the "From Date" and "To Date" fields to define a custom date range.
   - **By Holiday Type**: Select the type of holidays you want to view (e.g., National, Local).

3. **Show Holidays**
   - Click the **"Show Holidays"** button to fetch and display the holidays based on your selected criteria.

4. **Learn More**
   - Click the **"Learn More"** button next to each holiday to search for more information on Google.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgments
- [Next.js](https://nextjs.org/)
- [Calendarific API](https://calendarific.com/)
- [YouTube](https://www.youtube.com/) for video hosting
