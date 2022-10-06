import * as path from 'path';
import { ClassDeclaration, Project } from 'ts-morph';
const tsConfigPath = 
  path.join('libs', 'atqr', 'domain', 'tsconfig.lib.json');

const project = new Project({
    // @todo: remove when done
    // useInMemoryFileSystem: true,
    tsConfigFilePath: tsConfigPath
  });

// @todo: fix path
const dtoFile = project.createSourceFile('libs/atqr/domain/src/dtos.ts');

// By default, the library will use the local file system
// based on the current working directory

//const fs = project.getFileSystem();

// 1. Listar arquivos de Entidades
const entityFiles = project.getSourceFiles('**/**/entity.type.ts');

if(entityFiles?.length === 0) {
  throw new Error('Could not get the Entity base class');
}

const entityClass = entityFiles[0].getClassOrThrow('Entity');

console.log('Entity class: ', entityClass.getName());
console.log(entityClass.getDerivedClasses().length)
// Para cada Entidade (classe que extende Entity)
entityClass.getDerivedClasses()
  .forEach(entity => {
    generateDTO(project, entity);
  });


//    1. Criar um arquivo DTO
//    2. Criar classe {NomeDaEntidade}DTO
//    3. Copiar as propriedades da Entidade para o DTO
function generateDTO(project: Project, entity: ClassDeclaration) {
  // const DTO = new ClassDec
  
  // dtoFile.addClass({

  // });

  // the passed in name is optional and defaults to the class name
  const dtoInterface = entity
    .extractInterface(`I${entity.getName()}`);

  dtoInterface.methods = []

  dtoFile.addInterface(dtoInterface);
}

dtoFile.fixMissingImports()

// when you're all done,
// call this and it will 
// save everything to the file system
project.saveSync()