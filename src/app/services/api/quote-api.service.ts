import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddQuoteDataInterface, QuoteInterface, QuoteInvoiceInterface, QuotLogsInterface, TransactionInterface } from '../../models/quote.models';
import { ChatMessageInterface, ChatMessagePostInterface, PaginatedObjectInterface, PaginatedRequestInterface } from '../../models/general.models';

@Injectable({
  providedIn: 'root'
})
export class QuoteAPIService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  addQuote(data: AddQuoteDataInterface) {
    const formData = new FormData();
    const dataKeys = ['requestQuote', 'validForDays', 'shopQuoteNumber', 'shopQuoteNotes', 'tax', 'shippingRate'];
    for (const dataKey of dataKeys) {
      const value = data[dataKey];
      formData.append(dataKey, value);
    }
    formData.append('lineItems', JSON.stringify(data['lineItems']));
    // @ts-ignore
    formData.append('deliveryDate', data['deliveryDate'].toISOString());
    data.attachments.forEach(file => formData.append('attachments', file, file.name));
    return this.httpClient.post(`${environment.APIUrl}/returned_quote/add`, formData);
  }

  listSubmittedQuotes(pageOptions: PaginatedRequestInterface, searchOptions: { searchKey: string }) {
    const queryParams = [];
    const paginationParams = `page_size=${pageOptions.pageSize}&page=${pageOptions.page}`;
    queryParams.push(paginationParams);
    if (searchOptions.searchKey) {
      const filterParams = `name_icontains=${searchOptions.searchKey}`;
      queryParams.push(filterParams);
    }
    return this.httpClient.get<PaginatedObjectInterface<QuoteInterface>>(`${environment.APIUrl}/returned_quote/list?${queryParams.join('&')}`);
  }

  getQuote(quoteId: string) {
    return this.httpClient.get<QuoteInterface>(`${environment.APIUrl}/returned_quote/${quoteId}`);
  }

  getQuoteInvoice(quoteId: string) {
    return this.httpClient.get<QuoteInvoiceInterface>(`${environment.APIUrl}/returned_quote/${quoteId}/invoice`);
  }


  listTransactions(pageOptions: PaginatedRequestInterface, searchOptions: { searchKey: string }) {
    const queryParams = [];
    const paginationParams = `page_size=${pageOptions.pageSize}&page=${pageOptions.page}`;
    queryParams.push(paginationParams);
    if (searchOptions.searchKey) {
      const filterParams = `name_icontains=${searchOptions.searchKey}`;
      queryParams.push(filterParams);
    }
    return this.httpClient.get<PaginatedObjectInterface<TransactionInterface>>(`${environment.APIUrl}/transaction/list?${queryParams.join('&')}`);
  }

  postChatMessage(messageData: ChatMessagePostInterface) {
    const formData = new FormData();
    formData.append('title', messageData.title);
    formData.append('returnedQuote', messageData.returnedQuote);
    formData.append('text', messageData.text);
    if (messageData.attachments) {
      messageData.attachments.forEach(file => formData.append('attachments', file));
    }
    return this.httpClient.post<ChatMessageInterface>(`${environment.APIUrl}/returned_quote/chat/post_message`, formData);
  }

  listMessages(quoteId: string) {
    return this.httpClient.get<Array<ChatMessageInterface>>(`${environment.APIUrl}/returned_quote/${quoteId}/chat/list_messages`);
  }

  getQuoteHistory(quoteId: string) {
    return this.httpClient.get<QuotLogsInterface>(`${environment.APIUrl}/returned_quote/${quoteId}/history`);
  }
}
