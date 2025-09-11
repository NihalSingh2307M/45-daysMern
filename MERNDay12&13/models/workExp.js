const mongoose = require('mongoose');

const workExpSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    minlength: [2, 'Position must be at least 2 characters'],
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Start date cannot be in the future'
    }
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        // Only validate if endDate exists and we're not currently employed
        if (value && !this.current) {
          return value >= this.startDate;
        }
        return true;
      },
      message: 'End date must be after start date'
    }
  },
  current: {
    type: Boolean,
    default: false,
  },
  technologies: {
    type: [String],
    validate: {
      validator: function(arr) {
        return arr.length <= 20; // Max 20 technologies
      },
      message: 'Cannot have more than 20 technologies'
    }
  },
  achievement: {
    type: String,
    trim: true,
    maxlength: [500, 'Achievement cannot exceed 500 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property to calculate duration
workExpSchema.virtual('duration').get(function() {
  const start = this.startDate;
  const end = this.current ? new Date() : this.endDate;
  
  if (!end) return null;
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  } else {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
});

workExpSchema.virtual('formattedStartDate').get(function() {
  return this.startDate.toLocaleDateString();
});


workExpSchema.virtual('formattedEndDate').get(function() {
  return this.endDate ? this.endDate.toLocaleDateString() : 'Present';
});

// Instance method to check if position is recent (within last 2 years)
workExpSchema.methods.isRecent = function() {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  
  const endDate = this.current ? new Date() : this.endDate;
  return endDate && endDate >= twoYearsAgo;
};


workExpSchema.statics.findCurrentPositions = function() {
  return this.find({ current: true });
};

// Static method to find by company
workExpSchema.statics.findByCompany = function(companyName) {
  return this.find({ 
    company: { $regex: companyName, $options: 'i' } 
  });
};

// Pre-save middleware for additional validation
workExpSchema.pre('save', function(next) {

  if (this.current) {
    this.endDate = null;
  }
  
  if (this.company) {
    this.company = this.company.charAt(0).toUpperCase() + this.company.slice(1);
  }
  if (this.position) {
    this.position = this.position.charAt(0).toUpperCase() + this.position.slice(1);
  }
  
  next();
});


workExpSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  
  if (update.current === true) {
    update.endDate = null;
  }
  
  next();
});

const WorkExp = mongoose.model('WorkExp', workExpSchema);

module.exports = WorkExp;