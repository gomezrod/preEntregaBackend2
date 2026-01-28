import { $ } from './utils.js'

const section = $('#datos');

if(section?.dataset?.message){
    alert(section.dataset.message);
}