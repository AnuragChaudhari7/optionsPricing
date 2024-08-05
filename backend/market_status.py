from datetime import datetime, time
import holidays
import pytz as tz

def market_status():
    
    try:
        # Set the timezone to Eastern Standard Time (EST)
        eastern_tz = tz.timezone('US/Eastern')
        current_time_eastern = datetime.now(eastern_tz)

        nyse_holidays = holidays.NYSE()
        today_date_str = current_time_eastern.strftime('%Y-%m-%d')
        is_holiday = nyse_holidays.get(today_date_str)
        if is_holiday:
            return 'CLOSED'

        # Check if the current day (EST) is a weekday
        day_of_week = current_time_eastern.weekday()
        if day_of_week == 5 or day_of_week == 6:
            return 'CLOSED'

        # Define the market open and close times in EST
        market_open_time = time(9, 0)  # Market opens at 9:00 AM EST
        market_close_time = time(16, 0)  # Market closes at 4:00 PM EST

        if market_open_time <= current_time_eastern.time() <= market_close_time:
            return 'OPEN'
        else:
            return 'CLOSED'

    except Exception as err:
        print(err)

    return True

#print(market_status())