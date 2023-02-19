function solution(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const table: Element = div.querySelector("table");

    if (!table) return "";

    const defaultAlign = "left";
    const mapAlignValueToMarkdown = {
        left: " :--- ",
        center: " :---: ",
        right: " ---: ",
    };

    const rows = [];
    const alignments = [];
    const mapTagNameToProcessors = getProcessors(
        alignments,
        rows,
        defaultAlign
    );

    for (const child of Array.from(table.children)) {
        mapTagNameToProcessors[child.tagName.toLowerCase()](child);
    }

    // console.log(mapTagNameToProcessors);

    if (alignments.length === 0) {
        alignments.push(...Array(rows[0].length).fill(defaultAlign));
    }
    const tHeaderRow = ("| " + rows[0].join(" | ") + " |");
    const alignsRow =
        ("|" +
        alignments.map((align) => mapAlignValueToMarkdown[align]).join("|") +
        "|");
    const dataRows = rows
        .slice(1)
        .map((rowContent) => ("| " + rowContent.join(" | ") + " |"));

    const markdownTable = [tHeaderRow, alignsRow, ...dataRows].join("\n");

    return markdownTable;
}

const getProcessors = (alignments, rows, defaultAlign) => ({
    colgroup: (colgroup) => {
        alignments.push(
            ...Array.from(colgroup.children).map(
                (col: Element) => col.getAttribute("align") || defaultAlign
            )
        );
    },
    thead: (thead) => {
        rows.push(...Array(...thead.children).map(processTr));
    },
    tbody: (tbody) => {
        rows.push(...Array(...tbody.children).map(processTr));
    },
});

const processTr = (tr) => Array(...tr.children).map(processCell);

const processCell = (cell) => {
    const tag = cell.tagName.toLowerCase();
    const content = clearWhiteSpaces(cell.innerHTML);

    return {
        td: content,
        th: `**${content}**`,
    }[tag];
};

const clearWhiteSpaces = (str) =>
    str.replace(/\n+/g, "").replace(/\s+/g, " ").trim();

let input = `<table>  
<colgroup>  
    <col align="right" />  
    <col />  
    <col align="center" />  
</colgroup>  
<thead>  
    <tr>  
        <td>Command    
        
        
                    
            
            
         
             
        
        </td>  
        <td>Description     </td> 
        <th>Is implemented  </th>  
    </tr>  
</thead>  
<tbody>  
    <tr>  
        <th>git status</th>  
        <td>List all new or modified    files</td>  
        <th>Yes</th>  
    </tr>  
    <tr>  
        <th>git diff</th>  



        
        
        <td>Show file differences that haven’t been  
staged</td>  
        <td>No</td>  
    </tr>  
</tbody>  
</table>`;

console.log(solution(input));

module.exports = solution;
