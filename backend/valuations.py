from yahoo_fin import stock_info as si
import yahoo_fin.options as ops
from datetime import datetime
from black_scholes import black_scholes_call

def decimalise(x):
    """
    this function remove % string and converts to decimal"""
    x = x.replace('%', '')
    x = x.replace(',', '')
    return float(x) / 100

def expiry_from_contract(contract_name, ticker):
    """
    retrive expiry date from contract name"""
    n = len(ticker)
    expiry_date_string = contract_name[n:n+6]
    expiry_date = datetime.strptime(expiry_date_string, "%y%m%d")
    return expiry_date.date()

def time_to_expiry(contract_name, ticker):
    """
    Calculate number of yrs for contract"""
    today = datetime.today().date()
    expiry = expiry_from_contract(contract_name=contract_name, ticker=ticker)
    delta = expiry - today
    days = delta.days + 1
    return float(days / 365)

def call_option_value(x):
    """
    Apply Model to df"""
    ret_val = -1
    if x['volatility'] > 0:
        ret_val = black_scholes_call(
        S=x['stock_price'],
        K=x['strike'],
        T=x['time_to_expiry'],
        r=x['interest_rate'],
        sig=x['volatility']
        )
    return round(float(ret_val),2)

def label_valuation(ask_price,fair_price):
    """
    Label valuations"""
    if fair_price < 0:
        return 'N/A'
    elif ask_price > fair_price:
        return 'Overvalued'
    elif ask_price < fair_price:
        return 'Undervalued'
    else:
        return 'Fair Value'

def get_valuations(ticker):
    # Get call options chain for particular ticker
    call_options_df = ops.get_calls(ticker=ticker)  

    # Collect realtime stock price for particular ticker
    stock_price_live = si.get_live_price(ticker=ticker).item() #float

    # Setup the Options Data into the results
    result_df = call_options_df.loc[:, ['Contract Name', 'Strike', 'Last Price', 'Implied Volatility']]
    result_df.insert(0, column='ticker', value=ticker)
    result_df.rename(columns={'Contract Name': 'contract_name', 
                            'Last Price': 'premium',
                            'Strike': 'strike',
                            'Implied Volatility': 'volatility'}, inplace=True)

    result_df['volatility'] = result_df['volatility'].apply(decimalise)

    # Add stock price column
    result_df['stock_price'] = stock_price_live

    # Add interest rate column
    interest_rate = 0.06 #TODO: Use API for this
    result_df['interest_rate'] = interest_rate

    # Add time to expiry column
    result_df['time_to_expiry'] = result_df.apply(lambda x: time_to_expiry(x['contract_name'], ticker), axis=1)
    
    # Adds fair price result column
    result_df.loc[:,'fair_price'] = result_df.apply(lambda x: call_option_value(x), axis=1)

    # Formats option for over/under valued
    result_df['valuation'] = result_df.apply(lambda x: label_valuation(x['premium'], x['fair_price']), axis=1)

    return result_df

#print(get_valuations("aapl"))