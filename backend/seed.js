const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/Category');
const Activity = require('./models/Activity');
const Log = require('./models/Log');

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // clear old data first
        await Category.deleteMany({});
        await Activity.deleteMany({});
        await Log.deleteMany({});
        console.log('Cleared old data');

        // add categories
        const categories = await Category.insertMany([
            { name: 'Health & Fitness', color: '#4CAF50', icon: '💪' },
            { name: 'Education', color: '#2196F3', icon: '📚' },
            { name: 'Leisure', color: '#FF9800', icon: '🎮' },
            { name: 'Household', color: '#9C27B0', icon: '🏠' },
            { name: 'Work', color: '#F44336', icon: '💼' }
        ]);
        console.log('Added ' + categories.length + ' categories');

        // add activities
        const activities = await Activity.insertMany([
            { name: 'Morning run', description: 'jogging around the neighborhood', categoryId: categories[0]._id },
            { name: 'Gym', description: 'weight training at the gym', categoryId: categories[0]._id },
            { name: 'Math homework', description: 'linear algebra exercises', categoryId: categories[1]._id },
            { name: 'Programming project', description: 'working on school project', categoryId: categories[1]._id },
            { name: 'Netflix', description: 'watching shows', categoryId: categories[2]._id },
            { name: 'Cooking dinner', description: 'making food for the week', categoryId: categories[3]._id },
            { name: 'Part-time shift', description: 'working at the store', categoryId: categories[4]._id }
        ]);
        console.log('Added ' + activities.length + ' activities');

        // add logs
        const logs = await Log.insertMany([
            { activityId: activities[0]._id, date: '2026-04-14', duration: 0.5, mood: 4, notes: 'felt good but was tired from yesterday' },
            { activityId: activities[1]._id, date: '2026-04-14', duration: 1.5, mood: 5, notes: 'hit a new pr on bench press' },
            { activityId: activities[2]._id, date: '2026-04-15', duration: 2, mood: 2, notes: 'these matrices are confusing me' },
            { activityId: activities[3]._id, date: '2026-04-15', duration: 3, mood: 4, notes: 'finally got the api working' },
            { activityId: activities[4]._id, date: '2026-04-16', duration: 2.5, mood: 5, notes: 'binged a whole season oops' },
            { activityId: activities[5]._id, date: '2026-04-17', duration: 1, mood: 3, notes: 'made pasta, turned out ok' },
            { activityId: activities[6]._id, date: '2026-04-18', duration: 5, mood: 3, notes: 'long shift, was pretty slow tho' },
            { activityId: activities[0]._id, date: '2026-04-19', duration: 0.5, mood: 4, notes: 'short run, legs still sore from gym' }
        ]);
        console.log('Added ' + logs.length + ' logs');

        console.log('Done seeding!');
        process.exit(0);
    } catch (err) {
        console.log('Error:', err);
        process.exit(1);
    }
}

seedDatabase();