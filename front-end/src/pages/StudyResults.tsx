export default function StudyResults() {
    const results = [
      { subject: "Toán", score: 9.0 },
      { subject: "Văn", score: 7.5 },
      { subject: "Anh", score: 8.5 },
    ];
  
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Kết Quả Học Tập</h2>
        <ul className="list-disc pl-6">
          {results.map((item, index) => (
            <li key={index} className="mb-2">
              <span className="font-medium">{item.subject}:</span> {item.score}/10
            </li>
          ))}
        </ul>
      </div>
    );
  }
  