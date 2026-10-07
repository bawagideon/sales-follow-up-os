// Sales Commitment & Follow-Up OS Engine
class SalesFollowUpOS {
  extractCommitments(callNote) {
    const text = callNote.text || '';
    const commitments = [];

    const patterns = [
      { regex: /send (?:the )?(?:pricing|quote|proposal)/i, commitment: 'SEND_PROPOSAL_QUOTE' },
      { regex: /share (?:the )?(?:case study|deck|slides)/i, commitment: 'SHARE_CASE_STUDY' },
      { regex: /introduce to (?:technical team|cto|engineer)/i, commitment: 'ENGINEERING_INTRO' },
      { regex: /follow up on (?:monday|tuesday|wednesday|thursday|friday|tomorrow)/i, commitment: 'SCHEDULED_CHECKIN' }
    ];

    patterns.forEach(p => {
      if (p.regex.test(text)) {
        commitments.push({
          type: p.commitment,
          extractedFrom: text.match(p.regex)[0],
          status: 'PENDING_FULFILLMENT',
          dueWithinHours: 24
        });
      }
    });

    return {
      noteId: callNote.id,
      clientName: callNote.clientName,
      commitmentCount: commitments.length,
      commitments,
      hasPendingPromises: commitments.length > 0
    };
  }
}

module.exports = { SalesFollowUpOS };
