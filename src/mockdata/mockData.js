export let customerList = {
    "Black Knight": "classifications/BlackKnight.csv",
    "Google": "classifications/Google.csv",
    "Heavywater": "classifications/HeavyWater.csv",
    "Yahoo": "classifications/Yahoo.csv",
    "We Bank": "classifications/WeBank.csv"
}

export let customerData = {
    "Black Knight": {
        "Appraisal Report": "Appraisal Report",
        "Automated Underwriting Feedback - DU Codified Findings": "Automated Underwriting Feedback - DU Codified Findings",
        "Closing Disclosure": "CD",
        "Credit Report": "Credit Reports",
        "Security Intrument": "Rider - ARM	SIARM",
    },
    "Google": {
        "Appraisal Report": "Appraisal Report",
        "Automated Underwriting Feedback - DU Codified Findings": "Automated Underwriting Feedback - DU Codified Findings",
        "Closing Disclosure": "Closing Disclosure",
        "Credit Report": "Credit Reports",
        "Security Intrument Rider - ARM": "SecurityIntrumentRider-ARM",
        "Pay Stub": "Pay Stubs",
        "W2": "Form W2"
    },
    "Heavywater": {
        "Appraisal Report": "Appraisal Report",
        "Automated Underwriting Feedback - DU Codified Findings": "Automated Underwriting Feedback - DU Codified Findings",
        "Closing Disclosure": "Closing Disclosure",
        "Credit Report": "Credit Reports",
        "Security Intrument Rider - ARM": "SecurityIntrumentRider-ARM",
        "Pay Stub": "Pay Stubs",
        "W2": "Form W2"
    },
    "Yahoo": {
        "Appraisal Report": "Appraisal Report",
        "Automated Underwriting Feedback - DU Codified Findings": "DU",
        "Credit Report": "Credit Report",
        "Security Intrument Rider - ARM": "SI-ARM",
        "Pay Stub": "Pay Stub",
        "W2": "W2",
    },
    "We Bank": {
        "Appraisal Report": "Appraisal Report",
        "Automated Underwriting Feedback - DU Codified Findings": "Automated Underwriting Feedback - DU Codified Findings",
        "Closing Disclosure": "Closing Disclosure",
        "Credit Report": "Credit Reports",
        "Security Intrument Rider - ARM": "SecurityIntrumentRider-ARM"
    }
}

export let documentTypes={
    "Appraisal Report": "samples/Appraisal Report.pdf",
    "Automated Underwriting Feedback - DU Codified Findings": "samples/Automated Underwriting Feedback - DU Codified Findings.pdf",
    "Closing Disclosure": "samples/Closing Disclosure.pdf",
    "Credit Report": "samples/Credit Report.pdf",
    "Security Intrument Rider - ARM": "samples/Security Intrument Rider - ARM.pdf",
    "Pay Stub": "",
    "W2": ""
}


export let groupedDocElements=[
    {
        groupId: 1,
        dataElements: [
            "DISBURSEMENT DATE",
            "PREPAYMENT PENALTY",
            "INITIAL PRINCIPAL",
            "INTEREST RATE",
            "LOAN AMOUNT",
            "CLOSING DATE",
            "LOAN AMORTIZATION",
            "LOAN AMORTIZATION",
            "DATE ISSUED",
            "PURCHASE PRICE",
            "INTEREST ONLY",
        ]
    },
    {
      groupId: 2,
      dataElements: [
          "PROPERTY ADDRESS LINE 2",
          "CASH TO BORROWER AT",
          "CASH FROM BORROWER AT",
          "PROPERTY TAXES PROJECTED PAYMENT",
          "HOMEOWNERS INSURANCE PROJECTED PAYMENT",
      ]
    },
    {
        groupId: 3,
        dataElements:[
            "PROPERTY ADDRESS ZIPCODE",
            "PROPERTY ADDRESS CITY",
            "PROPERTY ADDRESS LINE",
            "PROPERTY ADDRESS LINE 1",
            "PROPERTY ADDRESS STATE 2",
        ]
    }
]
