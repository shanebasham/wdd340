import { Pipe, PipeTransform } from '@angular/core';
import { Recommender } from './recommender.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})

export class RecommendersFilterPipe implements PipeTransform {

  transform(contacts: Recommender[], term) { 
    let filteredContacts: Recommender[] =[];  
    if (term && term.length > 0) {
        filteredContacts = contacts.filter(
          (contact:Recommender) => contact.name.toLowerCase().includes(term.toLowerCase())
        );
    }
    if (filteredContacts.length < 1){
        return contacts;
    }
    return filteredContacts;
  }
}
