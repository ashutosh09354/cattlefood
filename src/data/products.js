/* Mock product data (20 demo products) and categories */
export const products=[["Cattle Feed – Dairy Special","Cattle Feed",1450,1650,"25 kg",4.7,312,1,1,"Balanced ration for lactating cattle."],
["Cattle Feed – High Protein","Cattle Feed",1620,1800,"25 kg",4.6,198,1,0,"Protein-rich pellets for growth and maintenance."],
["Cattle Feed – Calf Starter","Cattle Feed",980,1050,"10 kg",4.5,120,1,1,"Palatable starter for young calves."],
["Cattle Feed – Maintenance Mix","Cattle Feed",1250,1250,"25 kg",4.3,88,1,0,"Everyday maintenance feed for dry cattle."],
["Buffalo Feed – High Energy","Buffalo Feed",1580,1790,"25 kg",4.8,276,1,1,"Energy-dense feed for working and milking buffalo."],
["Buffalo Feed – Lactation Plus","Buffalo Feed",1690,1850,"25 kg",4.6,154,1,0,"Formulated for lactating buffalo."],
["Buffalo Feed – Bulk Pack","Buffalo Feed",3050,3400,"50 kg",4.5,64,1,0,"Value pack for larger herds."],
["Buffalo Feed – Pellet Plus","Buffalo Feed",1520,1520,"25 kg",4.4,71,0,1,"Easy-to-eat pellets."],
["Goat Feed – Growth Formula","Goat & Sheep Feed",890,990,"10 kg",4.5,143,1,0,"Growth feed for goat kids."],
["Sheep Feed – Wool Care","Goat & Sheep Feed",940,1040,"10 kg",4.4,57,1,1,"Balanced feed for sheep flocks."],
["Goat Feed – Breeder Mix","Goat & Sheep Feed",1120,1120,"15 kg",4.3,49,1,0,"Supports breeding stock."],
["Poultry Feed – Broiler Special","Poultry Feed",1380,1520,"25 kg",4.6,231,1,0,"Broiler grower ration."],
["Poultry Feed – Layer Special","Poultry Feed",1410,1560,"25 kg",4.7,205,1,1,"Layer ration with calcium."],
["Poultry Feed – Chick Starter","Poultry Feed",820,900,"10 kg",4.5,98,1,0,"Crumble starter for chicks."],
["Poultry Feed – Country Birds","Poultry Feed",1190,1190,"25 kg",4.2,41,0,0,"For desi and country birds."],
["Mineral Mixture – Complete Nutrition","Mineral Mixture",420,480,"1 kg",4.8,402,1,0,"Chelated mineral blend for cattle."],
["Mineral Mixture – Calcium Boost","Mineral Mixture",360,360,"1 kg",4.5,167,1,1,"Calcium and phosphorus supplement."],
["Mineral Mixture – Bulk","Mineral Mixture",1650,1900,"5 kg",4.6,76,1,0,"Economy pack."],
["Feed Supplement – Rumen Care","Feed Supplements",540,600,"1 kg",4.4,92,1,1,"Supports healthy digestion."],
["Feed Supplement – Bypass Fat","Feed Supplements",1150,1300,"5 kg",4.6,83,1,0,"Energy supplement for high yielders."]
].map((a,i)=>({id:i+1,name:a[0],cat:a[1],price:a[2],orig:a[3],w:a[4],rating:a[5],rev:a[6],stock:!!a[7],isNew:!!a[8],desc:a[9],pop:a[6]}));
export const CATEGORIES=["Cattle Feed","Buffalo Feed","Goat & Sheep Feed","Poultry Feed","Mineral Mixture","Feed Supplements"];
