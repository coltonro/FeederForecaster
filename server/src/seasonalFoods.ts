interface foodController {
    foods: any
}

const foodController = <foodController>{}

const sunflower = {
    title: 'Sunflower',
    desc: 'High quality protein',
    imgPath: '/sunflowerseeds.jpg',
    details: 'Blackoil sunflower is a favorite of cardinals, but other seed-eaters like chickadees and titmice like it too. De-shelled seeds are most attractive, especially to small birds, but cost 20% - 30% more. '
}

const suet = {
    title: 'Suet',
    desc: 'Crude fat for energy',
    imgPath: '/suet_cake.png',
    details: 'Suet is fantastic for attracting many types of songbirds, even non seed-eaters like wrens and warblers. It can be served any time of year, but is especially valuble during winter as a high fat/high energy food to help birds stay warm.'
}

const peanuts = {
    title: 'Peanuts',
    desc: 'Favorite of Jays & Woodpeckers',
    imgPath: '/peanuts.jpg',
    details: 'Peanut details go here. Whole vs de-shelled peanuts.'
}

const water = {
    title: 'Water',
    desc: 'Attracts a great variety of birds.',
    imgPath: '/bird_bath_robin.png',
    details: 'Water details go here.'
}

const nectar = {
    title: 'Nectar',
    desc: 'Energy for Hummingbirds',
    imgPath: '/hummingbird_feeder.png',
    details: 'Nectar details go here.'
}

const jelly = {
    title: 'Jelly',
    desc: 'Orioles LOVE this sugary treat.',
    imgPath: '/oriole_feeder.png',
    details: 'Jelly details go here.'
}

const millet = {
    title: 'Millet',
    desc: 'A favorite of Buntings.',
    imgPath: '',
    details: 'Millet details go here.'
}

foodController.foods = async (req: any, res: any, next: any) => {
    // determine the current season, so prediction output can be more specific
    const determineSeason = () => {
        const today = new Date().toISOString().split('T')[0];
        const todayAsDate = new Date(today)
        const year = new Date().getFullYear();

        // seasons approximated by general Texas temps and bird activity, not actual equinox and solstice timings.
        const spring = new Date(`${year}-04-01`);
        const summer = new Date(`${year}-05-16`);
        const fall = new Date(`${year}-09-15`);
        const winter = new Date(`${year}-11-15`);

        if (todayAsDate >= spring && todayAsDate < summer) {
            return "Spring"
        } else if (todayAsDate >= summer && todayAsDate < fall) {
            return "Summer"
        } else if (todayAsDate >= fall && todayAsDate < winter) {
            return "Fall"
        } else {
            return "Winter"
        }
    }

    try {
        const recommendBySeason = () => {
            if (determineSeason() === "Winter") return [suet, sunflower, peanuts, jelly]
            if (determineSeason() === "Spring") return [sunflower, suet, peanuts, nectar, water]
            if (determineSeason() === "Summer") return [sunflower, nectar, water, millet]
            if (determineSeason() === "Fall") return [sunflower, suet, peanuts, water, millet]
        }

        res.locals.foods = recommendBySeason();
    } catch (err: any) {
        console.error(`Error in seasonalFoods.ts: `, err.message);
        next(err);
    }

    next()
}

export default foodController;