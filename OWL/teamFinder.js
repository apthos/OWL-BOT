//Aliases for teams
let league = [
	ATL_REIGN = ['atlanta reign','atl','atlanta','reign'],
	BOS_UPRISING = ['boston uprising','bos','boston','uprising'],
	CDH_HUNTERS = ['chengdu hunters','cdh','chengdu','hunters'],
	DAL_FUEL = ['dallas fuel','dal','dallas','fuel'],
	FLA_MAYHEM = ['florida mayhem','fla','florida','mayhem'],
	GZC_CHARGE = ['guangzhou charge','gzc','guangzhou','charge'],
	HOU_OUTLAWS = ['houston outlaws','hou','houston','outlaws'],
	HZS_SPARK = ['hangzhou spark','hzs','hangzhou','spark'],
	LAG_GLADIATORS = ['los angeles gladiators','gla','lag','gladiators'],
	LAV_VALIANT = ['los angeles valiant','val','lav','valiant'],
	LDN_SPITFIRE = ['london spitfire','ldn','london','spitfire'],
	NYC_EXCELSIOR = ['new york excelsior','nye','nyc','nyxl','new york','excelsior'],
	PAR_ETERNAL = ['paris eternal','par','paris','eternal'],
	PHI_FUSION = ['philadelphia fusion','phi','philadelphia','fusion'],
	SEO_DYNASTY = ['seoul dynasty','seo','seoul','dynasty'],
	SHD_DRAGONS = ['shanghai dragons','shd','shanghai','dragons'],
	SFS_SHOCK = ['san francisco shock','sfs','san','shock'],
	TOR_DEFIANT = ['toronto defiant','tor','toronto','defiant'],
	VAN_TITANS = ['vancouver titans','van','vancouver','titans'],
	WAS_JUSTICE = ['washington justice','was','washington','justice']
]

module.exports = {
	//Finds team corresponding to argument
	find(arg){
    	let validTeam = league.find(function (team) {
        	return team.includes(arg);

		});

		return validTeam;
    
	}

}
