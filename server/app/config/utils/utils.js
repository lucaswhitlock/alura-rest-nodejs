// process.env.NODE_CONFIG_DIR = process.cwd().concat("\\app\\config");
process.env.NODE_CONFIG_DIR = process.cwd().concat("/config");

const NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR;

const mergeObjects = (x, y) => {
	return Object.keys(x).reduce((a, key) => ({ ...a, [key]: y[key] || x[key] }), {});
};

export { 
  mergeObjects,
  NODE_CONFIG_DIR
};