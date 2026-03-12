// Script to add SEO metadata (metaTitle, metaDescription, faqs) to calculators.json
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../calculators/calculators.json');
const calculators = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const seoData = {
    'emi-calculator': {
        metaTitle: 'EMI Calculator – Free Online Loan EMI Calculator (2026)',
        metaDescription: 'Calculate your monthly loan EMI instantly. Free EMI calculator for home loan, car loan & personal loan with amortization schedule. Fast and accurate.',
        faqs: [
            { q: 'What is EMI?', a: 'EMI (Equated Monthly Installment) is a fixed monthly payment you make to repay a loan. It includes both principal and interest.' },
            { q: 'How is EMI calculated?', a: 'EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is principal, R is monthly rate, and N is number of months.' },
            { q: 'Is this EMI calculator free to use?', a: 'Yes, completely free. No login required.' },
            { q: 'Does a higher tenure reduce my EMI?', a: 'Yes, a longer tenure reduces EMI but increases total interest paid.' }
        ]
    },
    'bmi-calculator': {
        metaTitle: 'BMI Calculator – Free Online BMI Checker with Healthy Ranges (2026)',
        metaDescription: 'Calculate your Body Mass Index (BMI) instantly. Find out if you are underweight, normal, overweight or obese. Free & accurate BMI checker with chart.',
        faqs: [
            { q: 'What is BMI?', a: 'BMI is a measure of body fat based on height and weight that applies to adult men and women.' },
            { q: 'How is BMI calculated?', a: 'BMI = weight (kg) / height² (m). A BMI between 18.5 and 24.9 is considered healthy.' },
            { q: 'Is BMI an accurate measure of health?', a: 'BMI is a useful screening tool but not diagnostic. Athletes may have high BMI due to muscle mass.' },
            { q: 'Is this BMI calculator free?', a: 'Yes, completely free. No personal data is stored.' }
        ]
    },
    'age-calculator': {
        metaTitle: 'Age Calculator – Find Your Exact Age in Years, Months & Days (2026)',
        metaDescription: 'Find your exact age in years, months, and days instantly. Free online age calculator — perfect for forms, legal documents, and birthday countdowns.',
        faqs: [
            { q: 'How does the age calculator work?', a: 'It subtracts your date of birth from today\'s date, accounting for leap years and variable month lengths.' },
            { q: 'Is my data stored?', a: 'No. Calculation happens in your browser. No data is sent to any server.' },
            { q: 'Can I calculate age for a future date?', a: 'The calculator is designed for past dates. Future dates may return unexpected values.' },
            { q: 'Is this calculator accurate?', a: 'Yes, it handles leap years and different month lengths for full accuracy.' }
        ]
    },
    'percentage-calculator': {
        metaTitle: 'Percentage Calculator – Fast Percentage Finder Tool (Free 2026)',
        metaDescription: 'Calculate percentage instantly online. Find X% of Y, percentage change, or what percent X is of Y. Free, fast, and easy-to-use percentage tool.',
        faqs: [
            { q: 'What is the percentage formula?', a: 'Percentage = (Part / Whole) × 100. For example, 20 is 25% of 80.' },
            { q: 'How do I calculate percentage increase?', a: 'Percentage Increase = ((New Value - Old Value) / Old Value) × 100.' },
            { q: 'Is this tool free?', a: 'Yes, completely free.' },
            { q: 'Can I use this for GST calculations?', a: 'Yes, you can use percentage calculation to determine GST amounts on prices.' }
        ]
    },
    'loan-calculator': {
        metaTitle: 'Loan Calculator – Free Online Loan Repayment Calculator (2026)',
        metaDescription: 'Calculate your loan repayment amount, total interest, and amortization schedule. Free online loan calculator for any type of loan.',
        faqs: [
            { q: 'What is a loan calculator?', a: 'It helps you find monthly payments, total interest, and repayment amount based on loan amount, rate and tenure.' },
            { q: 'What is the loan formula?', a: 'Monthly Payment = [P × R × (1+R)^N] / [(1+R)^N - 1].' },
            { q: 'Does this calculate interest correctly?', a: 'Yes, it uses the standard reducing balance method used by most banks.' },
            { q: 'Is this tool free?', a: 'Yes, completely free to use.' }
        ]
    },
    'sip-calculator': {
        metaTitle: 'SIP Calculator – Free SIP Return Calculator for Mutual Funds (2026)',
        metaDescription: 'Calculate SIP returns on your mutual fund investments. Find out how much your monthly SIP can grow. Free SIP calculator with compound growth projection.',
        faqs: [
            { q: 'What is SIP?', a: 'SIP (Systematic Investment Plan) is a method of investing a fixed amount in mutual funds every month.' },
            { q: 'How is SIP return calculated?', a: 'SIP uses compound interest: M = P × [(1+r)^n – 1] / r × (1+r), where r is monthly rate and n is months.' },
            { q: 'What return rate should I assume?', a: 'Historically, Indian equity mutual funds have given 10–15% annual returns on average.' },
            { q: 'Is this SIP calculator free?', a: 'Yes, completely free to use.' }
        ]
    },
    'compound-interest-calculator': {
        metaTitle: 'Compound Interest Calculator – Investment Growth Tool (Free 2026)',
        metaDescription: 'Calculate compound interest and see how your investment grows over time. Free compound interest tool with yearly, quarterly, and monthly compounding.',
        faqs: [
            { q: 'What is compound interest?', a: 'Interest calculated on both principal and accumulated interest from previous periods.' },
            { q: 'What is the compound interest formula?', a: 'A = P × (1 + r/n)^(n×t), where P is principal, r is annual rate, n is compounding frequency, t is years.' },
            { q: 'How is it different from simple interest?', a: 'Compound interest earns interest on interest, resulting in exponential growth vs linear for simple interest.' },
            { q: 'Is this calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'simple-interest-calculator': {
        metaTitle: 'Simple Interest Calculator – Free SI Formula Tool Online (2026)',
        metaDescription: 'Calculate simple interest on loans or savings instantly. Free SI calculator — enter principal, rate, and time to get interest and total amount.',
        faqs: [
            { q: 'What is simple interest?', a: 'SI = (P × R × T) / 100, where P is principal, R is rate per year, T is time in years.' },
            { q: 'When is simple interest used?', a: 'Used in short-term loans, car loans, and some savings accounts.' },
            { q: 'Difference between simple and compound interest?', a: 'Simple interest is on principal only. Compound earns interest on interest too.' },
            { q: 'Is this calculator accurate?', a: 'Yes, uses the standard SI formula.' }
        ]
    },
    'salary-calculator': {
        metaTitle: 'Salary Calculator – Calculate In-Hand Salary from CTC (Free 2026)',
        metaDescription: 'Calculate your take-home salary from CTC. Free salary calculator accounting for PF, PT, and tax deductions. Know your exact monthly in-hand pay.',
        faqs: [
            { q: 'What is CTC?', a: 'CTC (Cost to Company) is the total annual salary package, including all benefits and allowances.' },
            { q: 'What deductions are included?', a: 'Common deductions include PF (12% of basic), Professional Tax (~₹200/month), and income tax.' },
            { q: 'Is in-hand salary always 70-80% of CTC?', a: 'Typically yes, but varies based on company structure, tax bracket, and specific deductions.' },
            { q: 'Is this salary calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'gst-calculator': {
        metaTitle: 'GST Calculator – Free Online GST Inclusive & Exclusive Tool (2026)',
        metaDescription: 'Calculate GST amount instantly. Find GST inclusive and exclusive prices for 5%, 12%, 18%, and 28% slabs. Free GST calculator for India.',
        faqs: [
            { q: 'What is GST?', a: 'GST (Goods and Services Tax) is an indirect tax levied on goods and services in India with slabs of 5%, 12%, 18%, and 28%.' },
            { q: 'What is GST inclusive vs exclusive?', a: 'Exclusive: GST is added to base price. Inclusive: listed price already includes GST.' },
            { q: 'How to calculate GST amount?', a: 'GST = (Original Price × GST Rate) / 100. Inclusive: GST = Price × Rate / (100 + Rate).' },
            { q: 'Is this GST calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'discount-calculator': {
        metaTitle: 'Discount Calculator – Calculate Sale Price Instantly (Free 2026)',
        metaDescription: 'Find the final price after discount instantly. Free discount calculator — enter original price and discount % to see sale price and amount saved.',
        faqs: [
            { q: 'How to calculate discount?', a: 'Discount Amount = Price × (Discount%/100). Final Price = Price – Discount Amount.' },
            { q: 'What is a discount percentage?', a: 'Discount % = (Discount Amount / Original Price) × 100.' },
            { q: 'Can I calculate reverse discount?', a: 'Yes. Original Price = Final Price / (1 – Discount%/100).' },
            { q: 'Is this discount calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'fuel-cost-calculator': {
        metaTitle: 'Fuel Cost Calculator – Trip Fuel Expense Estimator (Free 2026)',
        metaDescription: 'Estimate fuel cost for any trip in seconds. Enter distance, mileage, and fuel price to calculate total petrol or diesel expense. Fast and free.',
        faqs: [
            { q: 'How is fuel cost calculated?', a: 'Fuel Cost = (Distance / Mileage) × Fuel Price per litre.' },
            { q: 'What mileage should I enter?', a: 'Use your vehicle\'s actual average kmpl. Check owner\'s manual or recent tank-fill record.' },
            { q: 'Does it account for highway vs city driving?', a: 'Use different mileage values for highway (higher) vs city (lower) for more accuracy.' },
            { q: 'Is this fuel calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'unit-converter': {
        metaTitle: 'Unit Converter – Free Online Metric & Imperial Unit Tool (2026)',
        metaDescription: 'Convert units instantly — km to miles, kg to lbs, and more. Free online unit converter for distance, weight, and other common measurements.',
        faqs: [
            { q: 'How many km = 1 mile?', a: '1 mile = 1.60934 km. To convert miles to km, multiply by 1.60934.' },
            { q: 'How many kg = 1 pound?', a: '1 pound = 0.453592 kg.' },
            { q: 'Is the conversion accurate?', a: 'Yes, uses internationally accepted conversion factors.' },
            { q: 'Is this unit converter free?', a: 'Yes, completely free.' }
        ]
    },
    'electricity-bill-calculator': {
        metaTitle: 'Electricity Bill Calculator – Estimate Monthly Power Bill (Free 2026)',
        metaDescription: 'Estimate your monthly electricity bill instantly. Enter units consumed and rate per unit to calculate your power bill. Free online electricity calculator.',
        faqs: [
            { q: 'How is electricity bill calculated?', a: 'Bill = Units Consumed × Rate per Unit. Additional charges like meter rent and taxes may apply.' },
            { q: 'What is 1 unit of electricity?', a: '1 unit = 1 kWh (kilowatt-hour) — using a 1000W appliance for 1 hour.' },
            { q: 'How can I reduce my electricity bill?', a: 'Use energy-efficient appliances, turn off standby devices, and switch to LED lighting.' },
            { q: 'Is this electricity calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'rent-affordability-calculator': {
        metaTitle: 'Rent Affordability Calculator – How Much Rent Can I Afford? (2026)',
        metaDescription: 'Find out how much rent you can afford based on your monthly income. Free rent affordability calculator based on the popular 30% income rule.',
        faqs: [
            { q: 'What is the rent affordability rule?', a: 'The "30% rule" suggests spending no more than 30% of gross monthly income on rent.' },
            { q: 'How is rent affordability calculated?', a: 'Affordable Rent = Monthly Income × 0.30. This is a guideline, not a rigid rule.' },
            { q: 'Should I include utilities in my rent budget?', a: 'Yes, total housing costs (rent + utilities) should ideally stay under 30-35% of income.' },
            { q: 'Is this rent calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'inflation-calculator': {
        metaTitle: 'Inflation Calculator – Future Value of Money Tool (Free 2026)',
        metaDescription: 'Calculate the future value of money accounting for inflation. See how ₹1 lakh today compares to future value. Free inflation impact calculator.',
        faqs: [
            { q: 'What is inflation?', a: 'Inflation is the rate at which prices rise, reducing the purchasing power of money over time.' },
            { q: 'What is the future value formula?', a: 'Future Value = Present Value × (1 + Inflation Rate/100) ^ Years.' },
            { q: 'What is India\'s average inflation rate?', a: 'India\'s CPI inflation has historically ranged from 4% to 8% per year.' },
            { q: 'Is this inflation calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'savings-goal-calculator': {
        metaTitle: 'Savings Goal Calculator – Plan Monthly Savings to Reach Goals (2026)',
        metaDescription: 'Find out how much you need to save monthly to reach your financial goal. Free savings goal planner — enter target amount and deadline instantly.',
        faqs: [
            { q: 'How does the savings goal calculator work?', a: 'Monthly Savings = Goal Amount / Number of Months (simplified, without interest).' },
            { q: 'What if I want interest-bearing savings?', a: 'Use our SIP calculator for compound interest-based growth projections.' },
            { q: 'How do I set a realistic savings goal?', a: 'Calculate income minus fixed expenses. Aim to save at least 20% of monthly income.' },
            { q: 'Is this savings calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'retirement-calculator': {
        metaTitle: 'Retirement Calculator – Estimate Retirement Corpus Needed (Free 2026)',
        metaDescription: 'Plan your retirement by estimating the corpus you need. Free retirement calculator — enter your age, target retirement age, and monthly expenses.',
        faqs: [
            { q: 'How much retirement corpus do I need?', a: 'A common rule: 25× your annual expenses (the 4% withdrawal rule).' },
            { q: 'When should I start saving for retirement?', a: 'The earlier the better. Starting at 25 vs 35 results in dramatically different outcomes due to compounding.' },
            { q: 'Does this account for inflation?', a: 'This is a simplified estimator. For inflation-adjusted planning, consult a financial advisor.' },
            { q: 'Is this retirement calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'gratuity-calculator': {
        metaTitle: 'Gratuity Calculator – Free Online Gratuity Amount Calculator (2026)',
        metaDescription: 'Calculate your gratuity benefit based on years of service and salary. Free gratuity calculator as per the Payment of Gratuity Act, India.',
        faqs: [
            { q: 'What is gratuity?', a: 'A lump-sum payment made by an employer to an employee for services rendered over a minimum of 5 years.' },
            { q: 'What is the gratuity formula?', a: 'Gratuity = (Basic Salary + DA) × 15/26 × Years of Service.' },
            { q: 'Is gratuity taxable?', a: 'Government employees: fully exempt. Private employees: exempt up to ₹20 lakhs.' },
            { q: 'Is this gratuity calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'income-tax-calculator': {
        metaTitle: 'Income Tax Calculator – Free Tax Estimator (New Regime 2026)',
        metaDescription: 'Estimate your income tax liability under the New Tax Regime quickly. Free India income tax calculator for FY 2025-26. Simple and accurate.',
        faqs: [
            { q: 'What are the new tax regime slabs for 2025-26?', a: 'Under the new regime: 0-3L: Nil, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, Above 15L: 30%.' },
            { q: 'Which regime is better — old or new?', a: 'New regime suits those with fewer deductions. Old regime is better with heavy 80C/HRA deductions.' },
            { q: 'Is this for FY 2025-26?', a: 'Yes, uses the latest FY 2025-26 (AY 2026-27) new regime slabs.' },
            { q: 'Is this tax calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'fd-calculator': {
        metaTitle: 'FD Calculator – Fixed Deposit Maturity Amount Calculator (Free 2026)',
        metaDescription: 'Calculate Fixed Deposit maturity amount and interest earned. Free FD calculator for all tenures and interest rates. Plan your FD investment easily.',
        faqs: [
            { q: 'How is FD maturity calculated?', a: 'FD Maturity = P × (1 + r/n)^(n×t), where P is principal, r is annual rate, n is compounding periods, t is years.' },
            { q: 'What is the current best FD rate?', a: 'FD rates vary by bank. Senior citizens typically get an additional 0.25-0.50% higher rate.' },
            { q: 'Is FD interest taxable?', a: 'Yes, FD interest is taxable. TDS is deducted if interest exceeds ₹40,000/year.' },
            { q: 'Is this FD calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'rd-calculator': {
        metaTitle: 'RD Calculator – Recurring Deposit Maturity Calculator (Free 2026)',
        metaDescription: 'Calculate your Recurring Deposit maturity amount and interest. Free RD calculator — enter monthly installment, rate, and tenure to get results.',
        faqs: [
            { q: 'What is a Recurring Deposit?', a: 'An RD is a savings scheme where you deposit a fixed amount monthly for a pre-defined period at a fixed interest rate.' },
            { q: 'How is RD interest calculated?', a: 'RD uses quarterly compounding on each installment: M = R × [(1+i/4)^4n - 1] / [1-(1+i/4)^(-1/3)]' },
            { q: 'Is RD better than FD?', a: 'RD is better for regular savers; FD for lump-sum investments. Both are safe and earn guaranteed returns.' },
            { q: 'Is this RD calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'ppf-calculator': {
        metaTitle: 'PPF Calculator – Public Provident Fund Return Calculator (Free 2026)',
        metaDescription: 'Calculate your PPF maturity amount and interest earned. Free PPF calculator — see how your Public Provident Fund investment grows over 15 years.',
        faqs: [
            { q: 'What is PPF?', a: 'PPF (Public Provident Fund) is a long-term Indian government savings scheme with 15-year lock-in and tax-free returns.' },
            { q: 'What is the current PPF interest rate?', a: 'The PPF interest rate is set quarterly by the government. Recent rate is around 7.1% per annum.' },
            { q: 'Is PPF tax-free?', a: 'Yes. PPF has EEE status — contributions, interest, and maturity are all fully tax-free.' },
            { q: 'Is this PPF calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'nps-calculator': {
        metaTitle: 'NPS Calculator – National Pension System Return Estimator (2026)',
        metaDescription: 'Estimate your NPS corpus at retirement. Free NPS calculator — calculate National Pension System returns based on age, monthly investment, and ROI.',
        faqs: [
            { q: 'What is NPS?', a: 'NPS (National Pension System) is a voluntary retirement savings scheme regulated by PFRDA in India.' },
            { q: 'What returns can I expect from NPS?', a: 'NPS has historically given 8-12% returns depending on the asset mix (equity, bonds, government securities).' },
            { q: 'Is NPS tax deductible?', a: 'Yes. Section 80C (up to ₹1.5L) and additional ₹50,000 under 80CCD(1B).' },
            { q: 'Is this NPS calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'cagr-calculator': {
        metaTitle: 'CAGR Calculator – Compound Annual Growth Rate Tool (Free 2026)',
        metaDescription: 'Calculate CAGR (Compound Annual Growth Rate) of any investment instantly. Free CAGR calculator — enter start value, end value, and number of years.',
        faqs: [
            { q: 'What is CAGR?', a: 'CAGR measures the mean annual growth rate of an investment over a specified period.' },
            { q: 'What is the CAGR formula?', a: 'CAGR = (End Value / Start Value)^(1/Years) – 1.' },
            { q: 'Is a higher CAGR always better?', a: 'Generally yes, but CAGR does not show volatility. Two investments can have same CAGR with different risks.' },
            { q: 'Is this CAGR calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'hra-calculator': {
        metaTitle: 'HRA Calculator – Free HRA Tax Exemption Calculator India (2026)',
        metaDescription: 'Calculate your HRA tax exemption amount. Free HRA calculator for metro and non-metro cities — enter basic salary, HRA received, and rent paid.',
        faqs: [
            { q: 'What is HRA exemption?', a: 'HRA exemption = Least of: Actual HRA received, 50%/40% of Basic (metro/non-metro), Rent paid minus 10% of basic.' },
            { q: 'What are metro cities for HRA?', a: 'For HRA, metro cities are Delhi, Mumbai, Kolkata, and Chennai. All others are non-metro.' },
            { q: 'Can I claim HRA if living with parents?', a: 'Yes, pay rent to parents with receipt. Parents must declare it as rental income.' },
            { q: 'Is this HRA calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'roi-calculator': {
        metaTitle: 'ROI Calculator – Return on Investment Calculator (Free 2026)',
        metaDescription: 'Calculate Return on Investment (ROI) percentage instantly. Free ROI calculator — enter amount invested and returned to get your profit percentage.',
        faqs: [
            { q: 'What is ROI?', a: 'ROI (Return on Investment) measures gain or loss from an investment relative to its cost.' },
            { q: 'What is the ROI formula?', a: 'ROI = [(Returns – Investment) / Investment] × 100.' },
            { q: 'What is a good ROI?', a: 'For stocks, 10-15% annually is generally considered good. Varies widely by asset class.' },
            { q: 'Is this ROI calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'margin-calculator': {
        metaTitle: 'Margin Calculator – Profit Margin & Markup Tool (Free 2026)',
        metaDescription: 'Calculate profit margin and markup percentage instantly. Free margin calculator — enter cost and selling price to find gross profit and margin %.',
        faqs: [
            { q: 'What is profit margin?', a: 'Profit Margin = [(Selling Price – Cost) / Selling Price] × 100.' },
            { q: 'Difference between margin and markup?', a: 'Margin is profit as % of selling price. Markup is profit as % of cost price.' },
            { q: 'What is a good profit margin?', a: 'Retail: 2-10%, SaaS: 70-80%, Food businesses: 3-9%. Varies greatly by industry.' },
            { q: 'Is this margin calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'calorie-calculator': {
        metaTitle: 'Calorie Calculator – Daily Calorie Needs & TDEE Calculator (2026)',
        metaDescription: 'Calculate your daily calorie needs (TDEE) based on age, height, weight, gender, and activity level. Free TDEE and BMR calorie calculator.',
        faqs: [
            { q: 'What is TDEE?', a: 'TDEE (Total Daily Energy Expenditure) is total calories your body burns in a day including all activities.' },
            { q: 'How many calories to lose weight?', a: 'A deficit of 500 calories/day typically results in ~0.5 kg/week weight loss.' },
            { q: 'What formula is used?', a: 'Mifflin-St Jeor equation for BMR, then multiplied by an activity factor to get TDEE.' },
            { q: 'Is this calorie calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'bmr-calculator': {
        metaTitle: 'BMR Calculator – Basal Metabolic Rate Calculator Free (2026)',
        metaDescription: 'Calculate your Basal Metabolic Rate (BMR) instantly. Find the minimum calories your body needs at rest. Free BMR calculator for men and women.',
        faqs: [
            { q: 'What is BMR?', a: 'BMR (Basal Metabolic Rate) is the calories your body needs to maintain basic physiological functions at complete rest.' },
            { q: 'What formula is used?', a: 'Mifflin-St Jeor: Men: (10×W)+(6.25×H)-(5×A)+5. Women: (10×W)+(6.25×H)-(5×A)-161.' },
            { q: 'What is the difference between BMR and TDEE?', a: 'BMR is calories at rest. TDEE = BMR × Activity Factor = actual daily calorie need.' },
            { q: 'Is this BMR calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'body-fat-calculator': {
        metaTitle: 'Body Fat Calculator – Body Fat % Estimator Navy Method (Free 2026)',
        metaDescription: 'Estimate your body fat percentage using the US Navy method. Free body fat calculator — enter waist, neck, and height for an accurate estimate.',
        faqs: [
            { q: 'What is a healthy body fat percentage?', a: 'For men: 10-20% is healthy. For women: 18-28% is generally considered healthy.' },
            { q: 'What is the Navy method?', a: 'The US Navy formula uses body circumference measurements (waist, neck, height) to estimate body fat.' },
            { q: 'Is body fat % more useful than BMI?', a: 'Yes. Body fat % gives a more accurate picture for athletes and muscular individuals.' },
            { q: 'Is this body fat calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'ideal-weight-calculator': {
        metaTitle: 'Ideal Weight Calculator – Find Your Healthy Weight Range (2026)',
        metaDescription: 'Find your ideal healthy weight range based on height and gender. Free ideal weight calculator using the Hamwi and Devine formulas. Fast & accurate.',
        faqs: [
            { q: 'How is ideal weight calculated?', a: 'Multiple formulas exist: Hamwi, Devine, Robinson, and Miller. They use height and gender as inputs.' },
            { q: 'Is ideal weight the same as healthy BMI weight?', a: 'Related but different. Healthy BMI gives a range; ideal weight formulas give a single target value.' },
            { q: 'Does ideal weight vary for same height?', a: 'Yes. Muscle mass, bone density, and body composition mean ideal weight varies per individual.' },
            { q: 'Is this ideal weight calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'pregnancy-calculator': {
        metaTitle: 'Pregnancy Calculator – Due Date & Week Tracker (Free 2026)',
        metaDescription: 'Calculate your pregnancy due date and current week instantly. Free pregnancy due date calculator — enter your last period date for accurate results.',
        faqs: [
            { q: 'How is a pregnancy due date calculated?', a: 'Due Date = Last Menstrual Period (LMP) + 280 days (40 weeks), per Naegele\'s Rule.' },
            { q: 'How accurate is this due date estimate?', a: 'Only 5% of babies are born on their exact due date. It is a guideline, not a guarantee.' },
            { q: 'What is the first trimester?', a: 'Weeks 1-12 of pregnancy form the first trimester — the most critical period of fetal development.' },
            { q: 'Is this pregnancy calculator free?', a: 'Yes, completely free and private.' }
        ]
    },
    'ovulation-calculator': {
        metaTitle: 'Ovulation Calculator – Find Your Fertile Window (Free 2026)',
        metaDescription: 'Find your most fertile days and ovulation date. Free ovulation calculator — enter your last period date and cycle length to locate the fertile window.',
        faqs: [
            { q: 'When do I ovulate?', a: 'Ovulation typically occurs around 14 days before your next period (day 14 of a 28-day cycle).' },
            { q: 'What is the fertile window?', a: '5 days before ovulation plus the ovulation day itself — 6 days total when conception is possible.' },
            { q: 'How accurate is an ovulation calculator?', a: 'It is an estimate. Tracking BBT or using OPKs provides more accurate ovulation detection.' },
            { q: 'Is this ovulation calculator free?', a: 'Yes, completely free and private.' }
        ]
    },
    'area-calculator': {
        metaTitle: 'Area Calculator – Calculate Area of Rectangle, Circle & More (2026)',
        metaDescription: 'Calculate the area of any shape online — rectangle, circle, triangle, and more. Free area calculator with formula explanations. Fast and accurate.',
        faqs: [
            { q: 'What is the formula for area of a rectangle?', a: 'Area = Length × Width.' },
            { q: 'What is the formula for area of a circle?', a: 'Area = π × r², where r is the radius.' },
            { q: 'What units does this area calculator use?', a: 'Result is in square units of whatever unit you enter (cm², m², ft², etc.).' },
            { q: 'Is this area calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'volume-calculator': {
        metaTitle: 'Volume Calculator – Calculate Volume of Cube, Sphere & More (2026)',
        metaDescription: 'Calculate volume of 3D shapes — cube, sphere, cylinder, and more. Free online volume calculator with step-by-step formula explanations.',
        faqs: [
            { q: 'What is the formula for volume of a cube?', a: 'Volume = side³.' },
            { q: 'What is the formula for volume of a sphere?', a: 'Volume = (4/3) × π × r³.' },
            { q: 'What unit is the result in?', a: 'Cubic units of whatever unit you enter (cm³, m³, etc.).' },
            { q: 'Is this volume calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'speed-calculator': {
        metaTitle: 'Speed Calculator – Calculate Speed, Distance or Time (Free 2026)',
        metaDescription: 'Calculate speed, distance, or time using the S = D/T formula. Free speed calculator for physics, travel planning, and everyday use.',
        faqs: [
            { q: 'What is the speed formula?', a: 'Speed = Distance / Time. Rearranged: Distance = Speed × Time, Time = Distance / Speed.' },
            { q: 'What units does this calculator use?', a: 'km and hours by default, giving km/h. The formula works universally with any units.' },
            { q: 'How do I convert km/h to m/s?', a: 'Divide by 3.6. E.g., 90 km/h = 25 m/s.' },
            { q: 'Is this speed calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'gpa-calculator': {
        metaTitle: 'GPA Calculator – Grade Point Average Calculator Free (2026)',
        metaDescription: 'Calculate your GPA (Grade Point Average) quickly. Free GPA calculator — enter total grade points and credits to get your academic GPA score.',
        faqs: [
            { q: 'What is GPA?', a: 'GPA (Grade Point Average) is a numeric representation of academic performance, typically on a 4.0 or 10.0 scale.' },
            { q: 'How is GPA calculated?', a: 'GPA = Total Grade Points Earned / Total Credits Attempted.' },
            { q: 'What is a good GPA?', a: 'On a 4.0 scale, 3.5+ is excellent. On a 10.0 scale, 7.5+ is generally considered good.' },
            { q: 'Is this GPA calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'tip-calculator': {
        metaTitle: 'Tip Calculator – Split Bill and Calculate Tip Per Person (Free 2026)',
        metaDescription: 'Calculate tip amount and split the bill per person instantly. Free tip calculator — enter bill, tip %, and number of people for quick results.',
        faqs: [
            { q: 'How much tip should I leave?', a: 'Standard tip is 10-15% in India and 15-20% in the US. For excellent service, 20%+ is appreciated.' },
            { q: 'How is tip calculated?', a: 'Tip = Bill × (Tip% / 100). Per person = (Bill + Tip) / Number of People.' },
            { q: 'Should tip be calculated before or after tax?', a: 'Tipping on the pre-tax amount is most common, though both are acceptable.' },
            { q: 'Is this tip calculator free?', a: 'Yes, completely free.' }
        ]
    },
    'binary-calculator': {
        metaTitle: 'Binary Converter – Decimal to Binary Conversion Tool (Free 2026)',
        metaDescription: 'Convert decimal numbers to binary instantly. Free online binary converter — perfect for CS students, developers, and anyone learning number systems.',
        faqs: [
            { q: 'How do you convert decimal to binary?', a: 'Divide the number by 2 repeatedly and read remainders from bottom to top. E.g., 10 → 1010.' },
            { q: 'What is binary used for?', a: 'Binary (base 2) is the fundamental language of computers. All digital data is stored as 0s and 1s.' },
            { q: 'What is 255 in binary?', a: '255 in binary is 11111111 (8 bits), the maximum value for a single byte.' },
            { q: 'Is this binary converter free?', a: 'Yes, completely free.' }
        ]
    }
};

let updated = 0;
calculators.forEach(calc => {
    const data = seoData[calc.slug];
    if (data) {
        calc.metaTitle = data.metaTitle;
        calc.metaDescription = data.metaDescription;
        calc.faqs = data.faqs;
        updated++;
    }
});

fs.writeFileSync(filePath, JSON.stringify(calculators, null, 4), 'utf8');
console.log(`Updated ${updated} calculators with SEO metadata.`);
