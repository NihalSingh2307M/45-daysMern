import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema
(
    {
        companyName :
        {
            type:String,
            required:[true,'Please add a company name'],
        },
        
        jobTitle:
        {
            type:String,
            required:[true,'Please add a job Title'],
        },

        location :
        {
            type :String,
        },

        startDate :
        {
            type:Date,
            required:[true,'Please add a start date']
        },

        endDate:
        {
            type:Date,
        },
        isCurrent:
        {
            type:Boolean,
            default:false,
        },
        
        description :
        {
            type:[String],
        },
    },
    {
        timestamps:true,
    }
);

ExperienceSchema.pre('save',function(next){
    if(this,this.isCurrent){
        this.endDate = null;
    }
    next();
});

export default mongoose.model('Experience',ExperienceSchema);