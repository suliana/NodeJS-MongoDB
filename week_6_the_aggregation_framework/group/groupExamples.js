db.companies.aggregate([
    { $group: {
        _id: { founded_year: "$founded_year" },
        average_number_of_employees: { $avg: "$number_of_employees" }
    } },
    { $sort: { average_number_of_employees: -1 } }

])

db.companies.aggregate( [
    { $match : { founded_year : 2001 } },
    { $project : { _id: 0, name : 1, number_of_employees: 1 } },
    { $sort : { number_of_employees : -1 } }
] )


db.companies.aggregate( [
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { relationships: 1, _id: 0 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: "$relationships.person",
        count: { $sum: 1 }
    } },
    { $sort: { count: -1 } }
] )

db.companies.find({"relationships.person.permalink": "roger-ehrenberg"}).pretty()

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
db.companies.aggregate([
    { $project: { relationships: 1, _id: 0, name : 1, permalink: 1 } },
    { $unwind: "$relationships" },
    { $group: {
        _id: { person: "$relationships.person" },
        gross_companies: { $push : "$permalink" },
        unique_companies: { $addToSet : "$permalink" }
    } },
    { $project: {
        _id: 0,
        person: "$_id.person",
        gross_companies: 1,
        unique_companies: 1,
        unique_number_of_companies: { $size: "$unique_companies" },
        gross_number_of_companies: { $size: "$gross_companies" }
    } },
    { $sort: { unique_number_of_companies: -1 } }
]).pretty()
//////////////////////////////////////////////////////////////////////////////////////

db.item.aggregate([
    {$match : {
        category : { $exists : true, $ne : null}
    }},

    {$group: {
        _id: '$category',
        num:{$sum: 1},
        all : { $push : "$category" },
        //unique_cat: { $addToSet : "$category" }
    }},
    {$project:{
        _id :0,
        category:1,
        all:1,
        //unique_cat:1,
        //unique_num_cat: { $size: "$unique_cat" },
        all_num_cat: { $size: "$all" }
    }},
    {$sort: { _id:-1}} ])




db.item.aggregate([{$match : { category : { $exists : true,$ne : null } }},
    {$group: {_id: '$category', list : {$addToSet: "$category", lists :{$addToSet:$list}} }},
    {$project:{ _id :0,  lists:1,}}

    ])


//////////////////////////////////////////////////////////////////////////////////////


db.companies.aggregate( [
{ $group: {
        _id: { person : "$relationships.person.permalink"},
        companies : {$addToSet: "$name"  },
        count : {$sum : 1}
    } },
    { $sort: { count: -1 } }
] )

"companies":{$addToSet:"$name"}
{$project:{size:{$size:"$companies"}}

db.companies.aggregate([
    { $group: {
        _id: { founded_year: "$founded_year" },
        average_number_of_employees: { $avg: "$number_of_employees" }
    } },
    { $sort: { average_number_of_employees: -1 } }

])

db.companies.aggregate( [
    { $match: { "relationships.person.permalink": "roger-ehrenberg"} },
    { $unwind: "$relationships" },
    { $group: {
        _id:  { permalink :"$relationships.person.permalink"},
        companies : {$addToSet: "$name" },
        //count : {$sum : 1}
    } },
    { $project : {  numCompanies: { $size : "companies"}}}
    //{ $sort: { count: -1 } }
] )

db.companies.aggregate( [
    { $match: { "relationships.person.permalink": "roger-ehrenberg"} },
    { $unwind: "$relationships" },
    { $group: {
        _id:  { permalink :"$relationships.person.permalink"},
        companies : {$addToSet: "$name" },

    } },
    { $project : {  numCompanies: { $size : "companies"}}}
] )



///////////////////////////////////////////
db.grades.aggregate( [
    { $unwind: "$scores" },
    { $match: { "scores.type": { $ne: "quiz" } } },

    { $group: {
        _id: { class_id: "$class_id"},
        averageScore: { $avg: "$scores.score" },
    } },
    { $sort : { averageScore : -1 } }
] )


Match, Project and Sort
db.grades.aggregate( [
    {$match :
        "funding_rounds.raised_amount ": { $exists: true, $ne: [ ] } ,
         founded_year : 2004 ,
         "scores.type": { $gte: 5 }}



] )




db.companies.aggregate( [
    { $match :
        {
        "funding_rounds.raised_amount" : { $exists : true, $ne : null},
        founded_year : { $eq : 2004 },
        funding_rounds : { $size  : 5}
    } },

    { $project: {
        name : 1,
        _id : 0,
        avg: { $avg : "$funding_rounds.raised_amount" },
        largest_round: {$max: "$funding_rounds.raised_amount"}
     } },
    { $sort : { largest_round: -1 } }
] )


db.companies.aggregate( [
    { $group:{
        _id: "$name", count: { $sum: 1 },
        av_fund:{$avg:"$funding_rounds.raised_amount"}
    } },
    { $match: { "count": {  $gte: 5 } } },
    { $sort: { av_fund: -1 } }

] )


\\\\\\\\\\

db.accommodations.aggregate(
[
     {$project: {_id:1, name:1, zipcode:1,
                 size_of_name: {$size: "$name"}
                }
     },
     {$match: {"size_of_name": {$gt: 1}}}
])








db.companies.aggregate([
    { $match :
        {
        "funding_rounds.raised_amount" : { $exists : true, $ne : null},
        founded_year : { $eq : 2004 },
        //funding_rounds : { $size  : 5}
    } },
    { $group:{
        _id: "$name",
        count: { $sum: 1 },
        av_fund:{ $avg:"$funding_rounds.raised_amount"}
    } },
    { $match: { "count": {  $gte: 5 } } },
    { $sort: { count: -1 } }

])



db.companies.aggregate(
   [
      { $match: {
        "funding_rounds.raised_amount" : { $exists : true, $ne : null},
        founded_year : { $eq : 2004 },
      } },
      { $group: { _id: "funding_rounds.raised_amount", count: { $sum: 1 } } }
   ]
)




db.companies.aggregate( [
    { $match: {
        founded_year: { $eq: 2004 },
        "funding_rounds.raised_amount": { $exists : true, $ne : null}
    } },
    { $project: { name:1,
        _id:0,
       avg: { $avg: "$funding_rounds.raised_amount" },
       numberOf_rounds: { $size: "$funding_rounds"}
    }},
    { $match: {
        numberOf_rounds:  { $gte : 5}
    } },
    { $sort: { avg: 1 } }
] )


db.item.aggregate([
    { $project: {_id: 0, num:1}},
    { $group: {
        _id: { category : "$category"},
        num: { $sum: 1 }
    } },
    { $sort: { num: -1 } }
] )




