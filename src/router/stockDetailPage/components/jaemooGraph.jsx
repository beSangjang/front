export default function JaemooGraph(jaemooJson) {
  const statement = jaemooJson.jaemooJson;

  return (
    <div className="w-full flex flex-col py-4">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead class="bg-gray-100 text-center">
          <tr>
            <th class="py-2 px-4 border-b">Item</th>
            <th class="py-2 px-4 border-b">2019</th>
            <th class="py-2 px-4 border-b">2020</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 px-4 border-b">Net Sales</td>
            <td class="py-2 px-4 border-b">$100,000</td>
            <td class="py-2 px-4 border-b">$120,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Cost of Goods Sold</td>
            <td class="py-2 px-4 border-b">$50,000</td>
            <td class="py-2 px-4 border-b">$60,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Cash</td>
            <td class="py-2 px-4 border-b">$90,000</td>
            <td class="py-2 px-4 border-b">$110,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Gross Profit</td>
            <td class="py-2 px-4 border-b">$50,000</td>
            <td class="py-2 px-4 border-b">$60,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Accounts Receivable</td>
            <td class="py-2 px-4 border-b">$20,000</td>
            <td class="py-2 px-4 border-b">$30,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Inventory</td>
            <td class="py-2 px-4 border-b">$35,000</td>
            <td class="py-2 px-4 border-b">$40,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Rent Expense</td>
            <td class="py-2 px-4 border-b">$5,000</td>
            <td class="py-2 px-4 border-b">$5,500</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Short-Term Investments</td>
            <td class="py-2 px-4 border-b">$15,000</td>
            <td class="py-2 px-4 border-b">$20,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Depreciation Expense</td>
            <td class="py-2 px-4 border-b">$2,500</td>
            <td class="py-2 px-4 border-b">$3,600</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Total Current Assets</td>
            <td class="py-2 px-4 border-b">$160,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Salaries Expense</td>
            <td class="py-2 px-4 border-b">$3,000</td>
            <td class="py-2 px-4 border-b">$5,400</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Equipment</td>
            <td class="py-2 px-4 border-b">$40,000</td>
            <td class="py-2 px-4 border-b">$50,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Utility Expense</td>
            <td class="py-2 px-4 border-b">$1,500</td>
            <td class="py-2 px-4 border-b">$2,500</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Total Assets</td>
            <td class="py-2 px-4 border-b">$200,000</td>
            <td class="py-2 px-4 border-b">$250,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Operating Income</td>
            <td class="py-2 px-4 border-b">$38,000</td>
            <td class="py-2 px-4 border-b">$43,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Accounts Payable</td>
            <td class="py-2 px-4 border-b">$3,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Interest Expense</td>
            <td class="py-2 px-4 border-b">$2,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Income Tax Expense</td>
            <td class="py-2 px-4 border-b">$5,000</td>
            <td class="py-2 px-4 border-b">$6,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Net Income</td>
            <td class="py-2 px-4 border-b">$30,000</td>
            <td class="py-2 px-4 border-b">$35,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Unearned Revenue</td>
            <td class="py-2 px-4 border-b">$10,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Total Current Liabilities</td>
            <td class="py-2 px-4 border-b">$70,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Notes Payable</td>
            <td class="py-2 px-4 border-b">$40,000</td>
            <td class="py-2 px-4 border-b">$50,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Total Liabilities</td>
            <td class="py-2 px-4 border-b">$150,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Common Stock</td>
            <td class="py-2 px-4 border-b">$60,000</td>
            <td class="py-2 px-4 border-b">$75,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Ending Retained Earnings</td>
            <td class="py-2 px-4 border-b">$15,000</td>
            <td class="py-2 px-4 border-b">$20,000</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">Total Stockholder Equity</td>
            <td class="py-2 px-4 border-b">$90,000</td>
            <td class="py-2 px-4 border-b">$0</td>
          </tr>
        </tbody>
        <tfoot class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 border-b">Total Assets</th>
            <td class="py-2 px-4 border-b">$200,000</td>
            <td class="py-2 px-4 border-b">$250,000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
