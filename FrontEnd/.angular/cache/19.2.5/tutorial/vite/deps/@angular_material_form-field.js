import {
  MatFormFieldModule
<<<<<<< HEAD
} from "./chunk-AOAW76TF.js";
=======
} from "./chunk-77AOVXH4.js";
>>>>>>> c11e36e327fc8c4cbd990fea75c6804fdac28f5d
import {
  MAT_ERROR,
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_PREFIX,
  MAT_SUFFIX,
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  getMatFormFieldDuplicatedHintError,
  getMatFormFieldMissingControlError,
  getMatFormFieldPlaceholderConflictError
<<<<<<< HEAD
} from "./chunk-OBTAJDXH.js";
import "./chunk-GCNZE6CO.js";
import "./chunk-X3P5GA7C.js";
import "./chunk-UU5Z7QKS.js";
import "./chunk-65RJ5ZZ2.js";
import "./chunk-LBR6PWTZ.js";
import "./chunk-42SAVLIU.js";
import "./chunk-DWB4KXJV.js";
import "./chunk-M3HR6BUY.js";
import "./chunk-PNN2A3NM.js";
import "./chunk-VJE4L4UK.js";
import "./chunk-5SLB7SFU.js";
import "./chunk-S35MAB2V.js";
=======
} from "./chunk-6UILUVRV.js";
import "./chunk-4YV5IRDM.js";
import "./chunk-UU5Z7QKS.js";
import "./chunk-LLV3XXMU.js";
import "./chunk-TRU6FIAD.js";
import "./chunk-FGX32Z2M.js";
import "./chunk-M3HR6BUY.js";
import "./chunk-5C4IP3J4.js";
import "./chunk-IBFEB6ZO.js";
import "./chunk-HF6ZTYXZ.js";
import "./chunk-HYG5KV37.js";
import "./chunk-GYNNYFCE.js";
import "./chunk-7PP4ZR3C.js";
>>>>>>> c11e36e327fc8c4cbd990fea75c6804fdac28f5d

// node_modules/@angular/material/fesm2022/form-field.mjs
var matFormFieldAnimations = {
  // Represents:
  // trigger('transitionMessages', [
  //   // TODO(mmalerba): Use angular animations for label animation as well.
  //   state('enter', style({opacity: 1, transform: 'translateY(0%)'})),
  //   transition('void => enter', [
  //     style({opacity: 0, transform: 'translateY(-5px)'}),
  //     animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
  //   ]),
  // ])
  /** Animation that transitions the form field's error and hint messages. */
  transitionMessages: {
    type: 7,
    name: "transitionMessages",
    definitions: [{
      type: 0,
      name: "enter",
      styles: {
        type: 6,
        styles: {
          opacity: 1,
          transform: "translateY(0%)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => enter",
      animation: [{
        type: 6,
        styles: {
          opacity: 0,
          transform: "translateY(-5px)"
        },
        offset: null
      }, {
        type: 4,
        styles: null,
        timings: "300ms cubic-bezier(0.55, 0, 0.55, 0.2)"
      }],
      options: null
    }],
    options: {}
  }
};
export {
  MAT_ERROR,
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_PREFIX,
  MAT_SUFFIX,
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  getMatFormFieldDuplicatedHintError,
  getMatFormFieldMissingControlError,
  getMatFormFieldPlaceholderConflictError,
  matFormFieldAnimations
};
//# sourceMappingURL=@angular_material_form-field.js.map
