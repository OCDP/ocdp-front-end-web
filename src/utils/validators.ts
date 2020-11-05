const includesVarName = `([\\w_$]+[\\w\\d_$]?)([.][\\w_$]+[\\w\\d_$]?)*`;
const includesInterpolation = `{{[\\s]*${includesVarName}[\\s]*}}`;

export default {
  isVarName: `^${includesVarName}$`,
  includesVarName,
  isInterpolation: `^${includesInterpolation}$`,
  includesInterpolation,
};
