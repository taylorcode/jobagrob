var ObjectID = require('mongodb').ObjectID,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend');

require('../plugins/validation-augments.js');


var elemSchema = {};

elemSchema.fields = new Schema({
  title: String,
  template: String,
  _id: false,
  id: false
});

elemSchema.textarea = elemSchema.fields.extend({
  placeholder: String,
  maxlength: Number
});

elemSchema.input = elemSchema.textarea.extend({
  fieldType: {
    type: String,
    enum: ['text', 'email', 'number']
  }
});

elemSchema.select = elemSchema.fields.extend({
  opts: [{
    val: String,
    id: false,
    _id: false
  }]
});

elemSchema.radio = elemSchema.select;
elemSchema.checkbox = elemSchema.select;

var applicationSchema = new Schema({
  fieldsets: [
    {
      id: false,
      _id: false,
      elems: [{
        props: {
          type: Schema.Types.Mixed,
          set: function (v) {
            var props = mongoose.model(v.template, elemSchema[v.template]);
            return new props(v);
          }
        },
        template: {
          type: String,
          enum: ['input', 'textarea', 'select', 'radio', 'checkbox']
        }
      }]
    }
  ],
  job: {
    type: Schema.ObjectId, 
    ref: 'Job'
  }
})

applicationSchema.methods.convertToSchema = function () {
  /*for(fieldset in this.fieldsets) {
    console.log
  }*/
}



module.exports = mongoose.model('Application', applicationSchema);