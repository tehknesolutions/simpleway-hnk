export const SW_LESSON_RUNTIME_VERSION='SW-LESSON-RUNTIME-V1';
export const PEDAGOGICAL_PHASES=Object.freeze([
  'CONTEXT_INPUT','CORE_VOCABULARY','GUIDED_PRODUCTION','ACTIVATION',
  'FREE_APPLICATION','RETENTION','CHECKPOINT'
]);
export const ACQUISITION_STAGES=Object.freeze([
  'EXPOSURE','COMPREHENSION','NOTICE','RETRIEVAL','TRANSFER_BOUNDARY'
]);

export function defineLearningSurface(surface){
  if(!surface?.id) throw new Error('Learning surface requires id');
  if(!surface?.phase || !PEDAGOGICAL_PHASES.includes(surface.phase)) throw new Error('Invalid pedagogical phase');
  if(surface.acquisitionStage && !ACQUISITION_STAGES.includes(surface.acquisitionStage)) throw new Error('Invalid acquisition stage');
  return Object.freeze({...surface});
}
