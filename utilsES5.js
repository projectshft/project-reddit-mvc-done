var Collection = function (config) {
  var models = []

  var init = functin () {
    if (config) {
      models.push(config)
    }
  }

  var changeCallback = null

  var add = function (item) {
    if (!_.includes(models, item) || _.isEmpty(models)) {
      models.push(item);

      if (changeCallback) {
        changeCallback()
      }
    }
  }

  var change = function (func) {
    changeCallback = func;
  }

  init();

  return {
    add: add,
    models: models,
    change: change
  }
};

var Model = function (config) {
  var attributes = {}

  var changeCallback = null

  var init = function () {
    Object.assign(attributes, config)
  }

  var set = function (prop, value) {
    var tempObj = Object.assign({}, attributes)

    tempObj[prop] = value

    if (!_.isEqual(attributes, tempObj)) {
      attributes[prop] = value

      if (changeCallback) {
        changeCallback()
      }
    }
  };

  var get = function (prop){
    return attributes[prop]
  };

  var change = function(func) {
    return changeCallback = func;
  }

  init()

  return {
    set: set,
    get: get,
    change: change
  }
};