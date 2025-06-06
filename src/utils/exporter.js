import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// 生成最外面的那个init，对应整个大mod
const generateModCode = (mod) => {
  let luaCode = `--[[
  ** 关于生成工具的声明 **

  ** 关于拓展的简单信息 **
--]]

Fk:loadTranslationTable { ["${mod.internal_name}"] = "${mod.name}" }

local _prefix = "packages.${mod.internal_name}.pkg."\n\n`;

  mod.packages.forEach((pkg) => {
    const pkgName = pkg.internal_name;
    luaCode += `local ${pkgName} = require(_prefix .. "${pkgName}")\n`;
  });

  luaCode += '\nreturn {\n';
  mod.packages.forEach((pkg) => {
    const pkgName = pkg.internal_name;
    luaCode += `  ${pkgName},\n`;
  });
  luaCode += '}\n';
  return luaCode;
};

// 生成每个pkg的那个init，对应包，同时负责包的角色
const generatePkgCode = (mod, pkg) => {
  let luaCode = `--[[
  ** 关于生成工具的声明 **

  ** 关于包的信息 **
--]]

local extension = Package:new(${pkg.internal_name})
extension = extensionName = ${mod.internal_name}
extension:loadSkillSkelsByPath("./packages/${mod.internal_name}/pkg/${pkg.internal_name}/skills")

-- 此为绕过local上限之法，仅用于生成器代码，请勿模仿
local _general_val

Fk:loadTranslationTable { ["${pkg.internal_name}"] = "${pkg.name}" }\n\n`;

  pkg.generals.forEach((gen) => {
    const gName = gen.internal_name;
    luaCode += `_general_val = General:new(extension, "${gName}", "shu", 4)\n`;
    // TODO: 更多信息...
    luaCode += `_general_val:addSkills {}\n`;
    luaCode += `Fk:loadTranslationTable {
  ["${gName}"] = "${gen.name}",
}\n`;
    luaCode += '\n';
  });

  luaCode += 'return extension\n';
  return luaCode;
};

// 生成packages/$MOD/pkg/$PKG/skills/$SKILL.lua
const generateSkillCode = (skill) => {
  let luaCode = `--[[
  ** 关于生成工具的声明 **

  ** 关于技能的信息 **
--]]

local _skill_val = fk.CreateSkill {
  name = "${skill.internal_name}",
}

Fk:loadTranslationTable {
  ["${skill.internal_name}"] = "${skill.name}",
  [":${skill.internal_name}"] = "${skill.description}",
}\n\n`;

  luaCode += 'return _skill_val\n';
  return luaCode;
};

export const exportToLua = async (mod) => {
  const zip = new JSZip();

  const rootFolder = zip.folder(mod.internal_name);
  rootFolder.file('init.lua', generateModCode(mod));

  const pkgFolder = rootFolder.folder('pkg');
  mod.packages.forEach((pkg) => {
    const pFolder = pkgFolder.folder(pkg.internal_name);
    pFolder.file('init.lua', generatePkgCode(mod, pkg));
    const skillFolder = pFolder.folder('skills');
    pkg.skills.forEach((skill) => {
      skillFolder.file(`${skill.internal_name}.lua`, generateSkillCode(skill));
    });
  });

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${mod.name}.zip`);
  });
};
