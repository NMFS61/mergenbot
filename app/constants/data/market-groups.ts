import { MarketGroups } from "@/app/interface/IMarketinfo";

export const  INDEX_GROUPS=
[
    {
        "name": "BIST 30",
        "exchange": "IS",
        "tickers": [
            "AEFES","AKBNK","ALARK","ASELS","ASTOR","BIMAS","EKGYO","ENKAI","EREGL","FROTO",
            "GARAN","HEKTS","ISCTR","KCHOL","KONTR","KOZAL","KRDMD","MGROS","PETKM","PGSUS",
            "SAHOL","SASA","SISE","TCELL","THYAO","TOASO","TTKOM","TUPRS","ULKER","YKBNK"
        ]
    },
    {
        "name": "BIST 50",
        "exchange": "IS",
        "tickers": [
            "AEFES","AKBNK","ALARK","ARCLK","ASELS","ASTOR","BIMAS","BRSAN","CCOLA","CIMSA",	 	
            "DOAS","DOHOL","EKGYO","ENJSA","ENKAI","EREGL","FROTO","GARAN","GUBRF","HALKB",	  	
            "HEKTS","ISCTR","KCHOL","KONTR","KOZAL","KRDMD","MAVI","MGROS","MIATK","ODAS",	  	
            "OYAKC","PETKM","PGSUS","REEDR","SAHOL","SASA","SISE","SOKM","TAVHL","TCELL",	 	
            "THYAO","TKFEN","TOASO","TTKOM","TUPRS","ULKER","VAKBN","VESTL","YKBNK","ZOREN"
        ]
    },
    {
        "name": "BIST 100",
        "exchange": "IS",
        "tickers": [
            "AEFES","AGHOL","AGROT","AKBNK","AKFYE","AKSA","AKSEN","ALARK","ALFAS","ALTNY",
            "ANHYT","ANSGR","ARCLK","ARDYZ","ASELS","ASTOR","BERA","BIMAS","BRSAN","BRYAT",
            "BSOKE","BTCIM","CANTE","CCOLA","CIMSA","CLEBI","CVKMD","CWENE","DOAS","DOHOL",
            "ECILC","EGEEN","EKGYO","ENERY","ENJSA","ENKAI","EREGL","EUPWR","FENER","FROTO",
            "GARAN","GESAN","GOLTS","GUBRF","HALKB","HEKTS","IEYHO","ISCTR","ISMEN","KARSN",
            "KCAER","KCHOL","KLSER","KONTR","KONYA","KOZAA","KOZAL","KRDMD","LIDER","MAGEN",
            "MAVI","MGROS","MIATK","MPARK","NTHOL","ODAS","OTKAR","OYAKC","PASEU","PETKM",
            "PGSUS","REEDR","SAHOL","SASA","SDTTR","SELEC","SISE","SKBNK","SMRTG","SOKM",
            "TABGD","TAVHL","TCELL","THYAO","TKFEN","TMSN","TOASO","TSKB","TSPOR","TTKOM",
            "TTRAK","TUKAS","TUPRS","TURSG","ULKER","VAKBN","VESTL","YEOTK","YKBNK","ZOREN"
        ]
    },
    {
        "name": "FTSE 100",
        "exchange": "LSE",
        "tickers": [
            "III","ADM","AAF","ALW","AAL","ANTO","AHT","ABF","AZN","AUTO",
            "AV","BA","BARC","BTRW","BEZ","BKG","BP","BATS","BLND","BT-A",
            "BNZL","CNA","CCH","CPG","CTEC","CRDA","DCC","DGE","DPLM","EDV",
            "ENT","EZJ","EXPN","FCIT","FRES","GAW","GLEN","GSK","HLN","HLMA",
            "HL","HIK","HSX","HWDN","HSBA","IHG","IMI","IMB","INF","ICG",
            "IAG","ITRK","JD","KGF","LAND","LGEN","LLOY","LMP","LSEG","MNG",
            "MKS","MRO","MNDI","NG","NWG","NXT","PSON","PSH","PSN","PHNX",
            "PCT","PRU","RKT","REL","RTO","RMV","RIO","RR","SGE","SBRY",
            "SDR","SMT","SGRO","SVT","SHEL","SMIN","SN","SPX","SSE","STAN",
            "STJ","TW","TSCO","ULVR","UU","UTG","VOD","WEIR","WTB","WPP"
        ]
    },
    {
        "name": "FTSE 250",
        "exchange": "LSE",
        "tickers": [
            "3IN","FOUR","ASL","ABDN","ALFA","ATT","ALPH","AO","APAX","ASHM","ASC",
            "AGR","AML","ATG","AGT","BME","BAB","BGFD","USA","BAKK","BBY",
            "BCG","BNKR","BAG","BBGI","AJB","BBH","BWY","BHMG","BYG","BRGE",
            "BRSC","THRG","BRWM","BMY","BSIF","BOY","BREE","BPT","BUT","BRBY",
            "BYIT","CCR","CLDN","CGT","CCL","CHG","CHRY","CTY","CKN","CMCX","COA",
            "CCC","CWK","CRST","CURY","ROO","DLN","DLG","DSCV","DEC","DOM",
            "DWL","DRX","DOCS","DNLM","EDIN","EWI","ELM","ESP","ENOG","ESNT",
            "EOT","ESCT","FXPO","FCSS","FEML","FEV","FSV","FGT","FGP","FGEN",
            "FSG","FSFL","FRAS","FUTR","GCP","GEN","GNS","GSCT","GDWN","GFTU",
            "GRI","GPE","UKW","GNC","GRG","HMSO","HBR","HVPE","HWG","HAS",
            "HTWS","HET","HSL","HRI","HGT","HICL","HILS","HFG","HOC","BOWL",
            "HTG","IBST","ICGT","IGG","IEM","INCH","IHP","IDS","INPP",
            "INVP","IPO","ITH","ITV","IWG","JMAT","JAM","JMG","JEDT","JGGI",
            "JII","JFJ","JTC","JUP","JUST","KNOS","KLR","KIE","LRE","LWDB",
            "BGEO","EMG","MSLH","MEGP","MRC","MRCH","MTRO","MAB","MTO","MCG",
            "GROW","MONY","MNKS","MOON","MGAM","MGNS","MUT","MYI","NBPE","NCC",
            "NESF","N91","NAS","OCDO","OSB","OXIG","ONT","PHI","PAGE","PIN",
            "PAG","PPET","PAY","PNN","PNL","PHLL","PETS","PTEC","PLUS","PCFT",
            "POLN","PPH","PFD","PHP","PRSR","QQ","QLT","RPI","RAT","RWI",
            "RSW","RHIM","RCP","ROR","RS1","RICA","SAFE","SVS","SDP","SOI",
            "SAIN","SEIT","SNR","SEQI","SRP","SHC","SRE","SSON","SCT","SXS",
            "SPI","SPT","SSPG","STEM","SUPR","SYNC","THRL","TATE","TBCG","TEP",
            "TMPL","TEM","TRIG","TIFS","TCAP","TRN","TPK","BBOX","TRY","TRST",
            "TFIF","SHED","VSVS","VCT","VEIL","VOF","VTY","FAN","WPS","WOSG",
            "JDW","SMWH","WIZZ","WG","XPS","ZIG"
        ]
    },
    {
        "name": "NASDAQ 100",
        "exchange": "US",
        "tickers": [
            "AMD","ABNB","GOOGL","GOOG","AMZN","AEP","AMGN","ADI","ANSS","AAPL",
            "AMAT","APP","ARM","ASML","AZN","TEAM","ADSK","ADP","AXON","BKR",
            "BIIB","BKNG","AVGO","CDNS","CDW","CHTR","CTAS","CSCO","CCEP","CTSH",
            "CMCSA","CEG","CPRT","CSGP","COST","CRWD","CSX","DDOG","DXCM","FANG",
            "DASH","EA","EXC","FAST","FTNT","GEHC","GILD","GFS","HON","IDXX","INTC",
            "INTU","ISRG","KDP","KLAC","KHC","LRCX","LIN","LULU","MAR","MRVL","MELI",
            "META","MCHP","MU","MSFT","MSTR","MDLZ","MDB","MNST","NFLX","NVDA","NXPI",
            "ORLY","ODFL","ON","PCAR","PLTR","PANW","PAYX","PYPL","PDD","PEP","QCOM",
            "REGN","ROP","ROST","SBUX","SNPS","TTWO","TMUS","TSLA","TXN","TTD","VRSK",
            "VRTX","WBD","WDAY","XEL","ZS"
        ]
    },
    {
        "name": "NYSE 100",
        "exchange": "US",
        "tickers": [
            "BRK-A","BRK-B","TSM","LLY","WMT","JPM","V","MA","XOM","ORCL","UNH","PG","NVO","JNJ","HD","ABBV","BAC","SAP","KO","BABA",
            "CRM","CVX","WFC","PM","ABT","TM","IBM","MRK","MCD","GE","ACN","NVS","MS","AXP","SHEL","HSBC","DIS","GS","TMO","T","BX",
            "NOW","VZ","RTX","RY","PGR","CAT","SPGI","UBER","HDB","BSX","SONY","PFE","DHR","BLK","C","UNP","MUFG","SYK","NEE","SHOP",
            "SCHW","UL","TJX","LOW","TTE","BA","FI","DE","COP","BHP","SPOT","BMY","BUD","KKR","NKE","MDT","MMC","PLD","ANET","ETN",
            "CB","UBS","LMT","TD","RIO","UPS","ICE","SMFG","IBN","SAN","SO","WELL","AMT","MO","WM","ENB","BAM","GEV","DUK"

        ]
    },
    {
        "name": "NYSE 200",
        "exchange": "US",
        "tickers": [
            "BRK-A","BRK-B","TSM","LLY","WMT","JPM","V","MA","XOM","ORCL","UNH","PG","NVO","JNJ","HD","ABBV","BAC","SAP","KO","BABA",
            "CRM","CVX","WFC","PM","ABT","TM","IBM","MRK","MCD","GE","ACN","NVS","MS","AXP","SHEL","HSBC","DIS","GS","TMO","T","BX",
            "NOW","VZ","RTX","RY","PGR","CAT","SPGI","UBER","HDB","BSX","SONY","PFE","DHR","BLK","C","UNP","MUFG","SYK","NEE","SHOP",
            "SCHW","UL","TJX","LOW","TTE","BA","FI","DE","COP","BHP","SPOT","BMY","BUD","KKR","NKE","MDT","MMC","PLD","ANET","ETN",
            "CB","UBS","LMT","TD","RIO","UPS","ICE","SMFG","IBN","SAN","SO","WELL","AMT","MO","WM","ENB","BAM","GEV","DUK",
            "SHW","MCO","ELV","RELX","AON","BP","BN","BTI","AJG","PH","PBR-A","PBR",
            "CI","APO","MMM","RACE","CVS","INFY","MCK","APH","TT","BBVA","ITW","ECL",
            "COF","GSK","BMO","TDG","PNC","HCA","ZTS","CL","RSG","SE","USB","MSI","EPD",
            "CMG","CP","DELL","MFG","WMB","EOG","SCCO","APD","SPG","CRH","EMR","GD","NOC",
            "ET","RCL","BDX","FDX","HLT","CNI","EQNR","BK","BNS","DEO","TFC","NGG","CNQ",
            "KMI","AFL","OKE","AZO","TRV","MET","SNOW","CM","TGT","SLB","JCI","LYG","CARR",
            "NSC","BCS","ING","HWM","MPLX","DLR","MFC","PSA","ARES","FCX","PSX","ALL","ITUB",
            "NU","AMP","LNG","O","CMI","CVNA","NET","FLUT","GWW","COR","WCN"

        ]
    },
    {
        "name": "FOREX",
        "exchange": "FOREX",
        "tickers": ["GBPUSD","AUDUSD","EURUSD",
            "USDJPY","USDCAD","USDCHF","USDHKD","USDNOK","USDSEK","USDSGD","USDTRY","USDPLN","USDMXN","USDHUF","USDDKK","USDNOK","USDCHF",
            "AUDNZD","GBPJPY","GBPAUD","GBPTRY","GBPNZD","GBPSGD","GBPCHF","GBPHKD","GBPNOK","GBPSEK","GBPAUD","GBPNZD","GBPCAD",
            "EURGBP","EURJPY","EURAUD","EURTRY","EURNZD","EURCHF","EURHKD","EURNOK","EURSEK","EURCAD","EURPLN",
            "AUDJPY","NZDJPY"]
    }

] as MarketGroups[];